(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7420],{6979:function(e,a,n){"use strict";var r=n(7294),c=n(4184),t=n.n(c),o=n(2263),s=n(5977),i=n(2644);a.Z=function(e){var a=(0,r.useState)(!1),c=a[0],l=a[1],u=(0,r.useRef)(null),d=(0,o.default)().siteConfig,h=(void 0===d?{}:d).themeConfig.algolia,p=(0,s.k6)(),f=(0,i.Z)().navigateToSearchPage;var b=function(e){void 0===e&&(e=!0),c||Promise.all([Promise.all([n.e(4362),n.e(5525)]).then(n.t.bind(n,4362,23)),Promise.all([n.e(532),n.e(3343)]).then(n.bind(n,3343))]).then((function(a){var n=a[0].default;l(!0),window.docsearch=n,function(e){window.docsearch({appId:h.appId,apiKey:h.apiKey,indexName:h.indexName,inputSelector:"#search_input_react",algoliaOptions:h.algoliaOptions,autocompleteOptions:{openOnFocus:!0,autoselect:!1,hint:!1},handleSelected:function(e,a,n){a.stopPropagation();var r=document.createElement("a");r.href=n.url;var c="#__docusaurus"===r.hash?""+r.pathname:""+r.pathname+r.hash;p.push(c)}}),e&&u.current.focus()}(e)}))},m=(0,r.useCallback)((function(){b(),c&&u.current.focus(),e.handleSearchBarToggle(!e.isSearchBarExpanded)}),[e.isSearchBarExpanded]),v=(0,r.useCallback)((function(){e.handleSearchBarToggle(!e.isSearchBarExpanded)}),[e.isSearchBarExpanded]),S=(0,r.useCallback)((function(e){var a="mouseover"!==e.type;b(a)})),g=(0,r.useCallback)((function(e){e.defaultPrevented||"Enter"!==e.key||f(e.target.value)}));return r.createElement("div",{className:"navbar__search",key:"search-box"},r.createElement("span",{"aria-label":"expand searchbar",role:"button",className:t()("search-icon",{"search-icon-hidden":e.isSearchBarExpanded}),onClick:m,onKeyDown:m,tabIndex:0}),r.createElement("input",{id:"search_input_react",type:"search",placeholder:"Search","aria-label":"Search",className:t()("navbar__search-input",{"search-bar-expanded":e.isSearchBarExpanded},{"search-bar":!e.isSearchBarExpanded}),onMouseOver:S,onFocus:S,onBlur:v,onKeyDown:g,ref:u}))}}}]);