import{S as s,i as t,s as e,j as o,m as r,o as n,v as a,r as c,w as m,A as p,p as u,q as i}from"../../../chunks/vendor-483ca6b6.js";import{D as f}from"../../../chunks/Datatable-bec85cba.js";import{S as $}from"../../../chunks/Section-69710e66.js";import"../../../chunks/auth-c13ad024.js";import"../../../chunks/stores-91ba20f1.js";import"../../../chunks/_transitions-34f54501.js";import"../../../chunks/store-97111950.js";import"../../../chunks/Spinner-460fa24f.js";import"../../../chunks/Checkbox-6f8586bf.js";import"../../../chunks/Table-c26e4894.js";import"../../../chunks/store-b327666d.js";import"../../../chunks/store-a8f0f898.js";function l(s){let t,e;const $=[s[0]];let l={};for(let o=0;o<$.length;o+=1)l=p(l,$[o]);return t=new f({props:l}),{c(){o(t.$$.fragment)},l(s){r(t.$$.fragment,s)},m(s,o){n(t,s,o),e=!0},p(s,e){const o=1&e?u($,[i(s[0])]):{};t.$set(o)},i(s){e||(a(t.$$.fragment,s),e=!0)},o(s){c(t.$$.fragment,s),e=!1},d(s){m(t,s)}}}function h(s){let t,e;return t=new $({props:{class:"space-y-[16px]",$$slots:{default:[l]},$$scope:{ctx:s}}}),{c(){o(t.$$.fragment)},l(s){r(t.$$.fragment,s)},m(s,o){n(t,s,o),e=!0},p(s,[e]){const o={};2&e&&(o.$$scope={dirty:e,ctx:s}),t.$set(o)},i(s){e||(a(t.$$.fragment,s),e=!0)},o(s){c(t.$$.fragment,s),e=!1},d(s){m(t,s)}}}function k(s){return[{collection:"routes",columns:[{title:"Group",key:"group"},{title:"Name",key:"name"},{title:"Route",key:"href"}],deleteModalFN:s=>`"${"group"in s?s.group+" - ":""}${s.name}"`,editable:!0,sort:{group:1,name:1}}]}export default class extends s{constructor(s){super(),t(this,s,k,h,e,{})}}