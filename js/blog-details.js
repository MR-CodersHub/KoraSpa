/**
 * KORA SPA — Blog Detail Renderer
 * Populates pages/blog-details.html from the article selected by ?article=<slug>.
 * The static markup remains a complete no-JS fallback for the featured article.
 */
(function () {
  'use strict';

  var articles = (window.SpaData && window.SpaData.blogArticles) || [];
  if (!articles.length) return;

  function getArticle() {
    var slug = new URLSearchParams(window.location.search).get('article');
    return articles.find(function (item) { return item.slug === slug; }) || articles[0];
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setText(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function setHTML(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  }

  function setAttr(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function sectionHTML(section) {
    var html = '<div id="' + esc(section.id) + '" class="article-sub-block">';
    html += '<h2>' + esc(section.heading) + '</h2>';

    (section.paragraphs || []).forEach(function (p) {
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
      section.list.forEach(function (item) { html += '<li>' + item + '</li>'; });
      html += '</ul>';
    }

    if (section.table) {
      html += '<div class="frequency-table-wrapper"><table class="frequency-table"><thead><tr>';
      section.table.headers.forEach(function (h) { html += '<th>' + esc(h) + '</th>'; });
      html += '</tr></thead><tbody>';
      section.table.rows.forEach(function (row) {
        html += '<tr>';
        row.forEach(function (cell, index) {
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
        '<img src="' + esc(article.inlineImage) + '" alt="' + esc(article.inlineAlt) + '" class="editorial-inline-img" loading="lazy">' +
        '<figcaption class="editorial-caption">' + esc(article.inlineCaption) + '</figcaption>' +
      '</figure>';
  }

  function relatedHTML(article) {
    var index = articles.findIndex(function (item) { return item.slug === article.slug; });
    var related = [1, 2, 3].map(function (offset) {
      return articles[(index + offset) % articles.length];
    });

    return related.map(function (item) {
      return '' +
        '<article class="related-card">' +
          '<div class="related-media">' +
            '<img src="' + esc(item.image) + '" alt="' + esc(item.imageAlt) + '" loading="lazy">' +
          '</div>' +
          '<div class="related-body">' +
            '<div class="article-meta-row" style="margin-bottom: 0.5rem;">' +
              '<span class="category-chip">' + esc(item.category) + '</span>' +
              '<span>&bull;</span>' +
              '<time datetime="' + esc(item.date) + '">' + esc(item.dateDisplay) + '</time>' +
            '</div>' +
            '<h3 class="related-title">' +
              '<a href="blog-details.html?article=' + encodeURIComponent(item.slug) + '">' + esc(item.title) + '</a>' +
            '</h3>' +
            '<p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 1.25rem;">' +
              esc(item.excerpt) +
            '</p>' +
            '<a href="blog-details.html?article=' + encodeURIComponent(item.slug) + '" class="article-link">' +
              'Read Guide' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
            '</a>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function tipsHTML(tips) {
    return tips.map(function (tip, index) {
      return '' +
        '<div class="tip-card">' +
          '<span class="tip-number">' + String(index + 1).padStart(2, '0') + '</span>' +
          '<h3 class="tip-title">' + esc(tip.title) + '</h3>' +
          '<p class="tip-text">' + esc(tip.text) + '</p>' +
        '</div>';
    }).join('');
  }

  function render(article) {
    var suffixMap = {
      'Sarah Chen': 'LMT',
      'Lisa Moretti': 'CIDESCO',
      'Maya Patel': 'RMT',
      'James Wilson': 'CSCS, LMT'
    };
    var suffix = suffixMap[article.author] || '';

    document.title = article.title + ' — Kora Spa Journal';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', article.excerpt);

    setText('#breadcrumbArticle', article.title);
    setText('#articleBadge', article.category);
    setText('.article-main-title', article.title);
    setText('#articleAuthor', 'By ' + article.author);
    setText('#articleDate', article.dateDisplay);
    setAttr('#articleDate', 'datetime', article.date);
    setText('#articleReadTime', article.readTime);

    setAttr('#articleAuthorPhoto', 'src', article.authorPhoto);
    setAttr('#articleAuthorPhoto', 'alt', article.author);

    setAttr('#articleHeroImage', 'src', article.image);
    setAttr('#articleHeroImage', 'alt', article.imageAlt);

    setHTML('#articlePullquote', '&ldquo;' + esc(article.pullquote) + '&rdquo;');
    setText('#articleLead', article.lead);

    setHTML('#articleTocList', article.toc.map(function (item) {
      return '<li class="toc-item"><a href="#' + esc(item.id) + '" class="toc-link">' + esc(item.label) + '</a></li>';
    }).join(''));

    var mainHTML = '';
    article.sections.forEach(function (section, index) {
      mainHTML += sectionHTML(section);
      if (index === 0) mainHTML += figureHTML(article);
    });
    setHTML('#mainArticleContent', mainHTML);

    setHTML('#tipsGrid', tipsHTML(article.tips));
    setText('#tipsTitle', article.tipsTitle);
    setText('#tipsSubtitle', article.tipsSubtitle);
    setText('#ambientTitle', article.ambientTitle);
    setText('#ambientText', article.ambientText);
    setText('#ctaTitle', article.ctaTitle);
    setText('#ctaText', article.ctaText);

    setAttr('#authorBioPhoto', 'src', article.authorPhoto);
    setAttr('#authorBioPhoto', 'alt', article.author + ', Kora Spa Specialist');
    setText('#authorBioName', article.author + (suffix ? ', ' + suffix : ''));
    setText('#authorBioRole', article.authorRole);
    setText('#authorBioText', article.authorBio);

    setHTML('#relatedGrid', relatedHTML(article));
  }

  render(getArticle());
})();
