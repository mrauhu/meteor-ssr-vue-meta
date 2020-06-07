import { WebApp } from 'meteor/webapp';

WebApp.addHtmlAttributeHook((req) => ({
  lang: 'en',
  // @see https://vue-meta.nuxtjs.org/faq/prevent-initial.html
  'data-vue-meta-server-rendered': '',
}));
