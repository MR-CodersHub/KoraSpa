/**
 * KORA SPA — Static blog article page generator
 *
 * Generates one self-contained HTML page per journal article from the shared
 * article data in js/data.js and the layout in pages/blog-details.html.
 * This removes any query-string / JavaScript routing dependency from blog cards.
 *
 * Run: node scripts/generate-blog-pages.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const templatePath = path.join(root, 'pages', 'blog-details.html');
const dataPath = path.join(root, 'js', 'data.js');
const blogPath = path.join(root, 'pages', 'blog.html');
const sitemapPath = path.join(root, 'pages', 'sitemap.html');

function loadArticles() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(dataPath, 'utf8'), sandbox, { filename: dataPath });
  return sandbox.window.SpaData.blogArticles;
}

function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function articleFile(article) {
  return 'blog-article-' + article.slug + '.html';
}

function replaceInnerById(html, id, inner) {
  const re = new RegExp('(<([a-zA-Z0-9]+)\\b[^>]*\\bid="' + id + '"[^>]*>)[\\s\\S]*?(</\\2>)', 'i');
  if (!re.test(html)) throw new Error('Missing editable element #' + id);
  return html.replace(re, (match, open, tag, close) => open + '\n' + inner + '\n          ' + close);
}

function replaceRegion(html, name, inner) {
  const start = '<!-- GEN:' + name + ' -->';
  const end = '<!-- /GEN:' + name + ' -->';
  const startIndex = html.indexOf(start);
  const endIndex = html.indexOf(end, startIndex);
  if (startIndex === -1 || endIndex === -1) throw new Error('Missing generated region ' + name);
  return html.slice(0, startIndex + start.length) + '\n' + inner + '\n        ' + html.slice(endIndex);
}

function replaceTagById(html, id, attrs) {
  const re = new RegExp('<([a-zA-Z0-9]+)\\b[^>]*\\bid="' + id + '"[^>]*>', 'i');
  if (!re.test(html)) throw new Error('Missing editable tag #' + id);
  return html.replace(re, (tag) => {
    let result = tag;
    Object.keys(attrs).forEach((name) => {
      const attrRe = new RegExp('\\s' + name + '="[^"]*"', 'i');
      const replacement = ' ' + name + '="' + esc(attrs[name]) + '"';
      if (attrRe.test(result)) result = result.replace(attrRe, replacement);
      else result = result.replace(/\s*\/?>$/, replacement + '>');
    });
    return result;
  });
}

function sectionHTML(section) {
  let html = '<div id="' + esc(section.id) + '" class="article-sub-block">';
  html += '<h2>' + esc(section.heading) + '</h2>';

  (section.paragraphs || []).forEach((p) => {
    html += '<p>' + p + '</p>';
  });

  if (section.highlight) {
    html += '<div class="highlight-box">';
    html += '<strong>' + esc(section.highlight.title) + '</strong>';
    html += '<p>' + esc(section.highlight.text) + '</p>';
    html += '</div>';
  }

  if (section.trailingParagraph) {
    html += '<p>' + esc(section.trailingParagraph) + '</p>';
  }

  if (section.list && section.list.length) {
    html += '<ul style="list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8;">';
    section.list.forEach((item) => { html += '<li>' + item + '</li>'; });
    html += '</ul>';
  }

  if (section.table) {
    html += '<div class="frequency-table-wrapper"><table class="frequency-table"><thead><tr>';
    section.table.headers.forEach((h) => { html += '<th>' + esc(h) + '</th>'; });
    html += '</tr></thead><tbody>';
    section.table.rows.forEach((row) => {
      html += '<tr>';
      row.forEach((cell, index) => {
        html += index === 0 ? '<td><strong>' + esc(cell) + '</strong></td>' : '<td>' + esc(cell) + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
  }

  html += '</div>';
  return html;
}

function figureHTML(article) {
  return '' +
    '<figure class="editorial-inline-media">' +
      '<img src="' + esc(article.inlineImage) + '" alt="' + esc(article.inlineAlt) + '" class="editorial-inline-img" loading="lazy" id="articleInlineImage">' +
      '<figcaption class="editorial-caption" id="articleInlineCaption">' + esc(article.inlineCaption) + '</figcaption>' +
    '</figure>';
}

function mainContentHTML(article) {
  return article.sections
    .map((section, index) => sectionHTML(section) + (index === 0 ? figureHTML(article) : ''))
    .join('\n\n        ');
}

function tocHTML(article) {
  return article.toc.map((item) => (
    '<li class="toc-item"><a href="#' + esc(item.id) + '" class="toc-link">' + esc(item.label) + '</a></li>'
  )).join('\n            ');
}

function tipsHTML(article) {
  return article.tips.map((tip, index) => (
    '<div class="tip-card">\n' +
    '            <span class="tip-number">' + String(index + 1).padStart(2, '0') + '</span>\n' +
    '            <h3 class="tip-title">' + esc(tip.title) + '</h3>\n' +
    '            <p class="tip-text">' + esc(tip.text) + '</p>\n' +
    '          </div>'
  )).join('\n\n          ');
}

function relatedHTML(article, articles) {
  const index = articles.findIndex((item) => item.slug === article.slug);
  const related = [1, 2, 3].map((offset) => articles[(index + offset) % articles.length]);

  return related.map((item) => {
    const file = articleFile(item);
    return '' +
      '<article class="related-card">\n' +
      '          <div class="related-media">\n' +
      '            <img src="' + esc(item.image) + '" alt="' + esc(item.imageAlt) + '" loading="lazy">\n' +
      '          </div>\n' +
      '          <div class="related-body">\n' +
      '            <div class="article-meta-row" style="margin-bottom: 0.5rem;">\n' +
      '              <span class="category-chip">' + esc(item.category) + '</span>\n' +
      '              <span>&bull;</span>\n' +
      '              <time datetime="' + esc(item.date) + '">' + esc(item.dateDisplay) + '</time>\n' +
      '            </div>\n' +
      '            <h3 class="related-title"><a href="' + file + '">' + esc(item.title) + '</a></h3>\n' +
      '            <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 1.25rem;">' + esc(item.excerpt) + '</p>\n' +
      '            <a href="' + file + '" class="article-link">\n' +
      '              Read Guide\n' +
      '              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>\n' +
      '            </a>\n' +
      '          </div>\n' +
      '        </article>';
  }).join('\n\n        ');
}

function authorSuffix(author) {
  const map = {
    'Sarah Chen': 'LMT',
    'Lisa Moretti': 'CIDESCO',
    'Maya Patel': 'RMT',
    'James Wilson': 'CSCS, LMT'
  };
  return map[author] || '';
}

function buildPage(template, article, articles) {
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + esc(article.title) + ' — Kora Spa Journal</title>');
  html = html.replace(/<meta name="description" content="[^"]*">/i, '<meta name="description" content="' + esc(article.excerpt) + '">');
  html = html.replace(/<!-- Generated by scripts\/generate-blog-pages\.js[\s\S]*?-->\n?/i, '');
  html = html.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<!-- Generated by scripts/generate-blog-pages.js — do not edit directly. -->');

  html = replaceInnerById(html, 'breadcrumbArticle', esc(article.title));
  html = replaceInnerById(html, 'articleBadge', esc(article.category));
  html = html.replace(/(<h1\b[^>]*class="[^"]*article-main-title[^"]*"[^>]*>)[\s\S]*?(<\/h1>)/i, (match, open, close) => open + esc(article.title) + close);

  html = replaceTagById(html, 'articleAuthorPhoto', { src: article.authorPhoto, alt: article.author });
  html = replaceInnerById(html, 'articleAuthor', 'By ' + esc(article.author));
  html = replaceTagById(html, 'articleDate', { datetime: article.date });
  html = replaceInnerById(html, 'articleDate', esc(article.dateDisplay));
  html = replaceInnerById(html, 'articleReadTime', esc(article.readTime));

  html = replaceTagById(html, 'articleHeroImage', { src: article.image, alt: article.imageAlt });
  html = replaceInnerById(html, 'articlePullquote', '&ldquo;' + esc(article.pullquote) + '&rdquo;');
  html = replaceInnerById(html, 'articleLead', esc(article.lead));
  html = replaceInnerById(html, 'articleTocList', tocHTML(article));
  html = replaceRegion(html, 'mainArticleContent', mainContentHTML(article));

  html = replaceTagById(html, 'articleInlineImage', { src: article.inlineImage, alt: article.inlineAlt });
  html = replaceInnerById(html, 'articleInlineCaption', esc(article.inlineCaption));

  html = replaceInnerById(html, 'tipsTitle', esc(article.tipsTitle));
  html = replaceInnerById(html, 'tipsSubtitle', esc(article.tipsSubtitle));
  html = replaceRegion(html, 'tipsGrid', tipsHTML(article));

  html = replaceInnerById(html, 'ambientTitle', esc(article.ambientTitle));
  html = replaceInnerById(html, 'ambientText', esc(article.ambientText));
  html = replaceRegion(html, 'relatedGrid', relatedHTML(article, articles));

  html = replaceInnerById(html, 'ctaTitle', esc(article.ctaTitle));
  html = replaceInnerById(html, 'ctaText', esc(article.ctaText));

  html = replaceTagById(html, 'authorBioPhoto', { src: article.authorPhoto, alt: article.author + ', Kora Spa Specialist' });
  const suffix = authorSuffix(article.author);
  html = replaceInnerById(html, 'authorBioName', esc(article.author + (suffix ? ', ' + suffix : '')));
  html = replaceInnerById(html, 'authorBioRole', esc(article.authorRole));
  html = replaceInnerById(html, 'authorBioText', esc(article.authorBio));
  html = html.replace('Book with Sarah', 'Book with ' + article.author.split(' ')[0]);

  html = html.replace(/<script src="\.\.\/js\/blog-details\.js"><\/script>\n?/i, '');

  return html;
}

function replaceQueryLinks(content) {
  return content.replace(/blog-details\.html\?article=([a-z0-9-]+)/g, (match, slug) => articleFile({ slug }));
}

function main() {
  const articles = loadArticles();
  const template = fs.readFileSync(templatePath, 'utf8');

  articles.forEach((article) => {
    const outputPath = path.join(root, 'pages', articleFile(article));
    fs.writeFileSync(outputPath, buildPage(template, article, articles), 'utf8');
    console.log('Generated pages/' + articleFile(article));
  });

  const blog = fs.readFileSync(blogPath, 'utf8');
  const updatedBlog = replaceQueryLinks(blog);
  if (updatedBlog !== blog) fs.writeFileSync(blogPath, updatedBlog, 'utf8');

  const detail = fs.readFileSync(templatePath, 'utf8');
  const updatedDetail = replaceQueryLinks(detail);
  if (updatedDetail !== detail) fs.writeFileSync(templatePath, updatedDetail, 'utf8');

  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const updatedSitemap = sitemap.replace(
    '<a href="blog-details.html" class="sitemap-card reveal">',
    '<a href="' + articleFile(articles[0]) + '" class="sitemap-card reveal">'
  );
  if (updatedSitemap !== sitemap) fs.writeFileSync(sitemapPath, updatedSitemap, 'utf8');
}

main();
