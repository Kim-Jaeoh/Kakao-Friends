"use strict";(self.webpackChunkkakaofriends=self.webpackChunkkakaofriends||[]).push([[746],{409:function(n,i,t){t.r(i);var e,o,r,d,l,a,p,s,c=t(4165),u=t(5861),x=t(9439),f=t(168),g=t(2791),h=t(4193),v=(t(9434),t(9126)),b=t(8726),k=t(1087),m=t(4614),w=t(1933),Z=(t(5002),t(1044)),j=t(763),y=(t(9062),t(516),t(184)),z=h.Z.div(e||(e=(0,f.Z)(["\n  padding-top: 36px;\n  border-top: 4px solid #f7f7f7;\n\n  > strong {\n    display: block;\n    padding: 0 20px 16px;\n    font-size: 22px;\n    line-height: 28px;\n    letter-spacing: -0.017em;\n    font-weight: bold;\n  }\n"]))),C=h.Z.ul(o||(o=(0,f.Z)(["\n  padding: 0 13px 0 12px;\n\n  @media screen and (min-width: 640px) {\n    padding: 0 14px;\n  }\n"]))),D=h.Z.li(r||(r=(0,f.Z)(["\n  display: inline-block;\n  width: 50%;\n  padding: 0 7px 40px 8px;\n  vertical-align: top;\n  box-sizing: border-box;\n\n  @media screen and (min-width: 640px) {\n    width: 33.333%;\n    padding: 0 6px 40px;\n  }\n"]))),E=h.Z.div(d||(d=(0,f.Z)([""]))),I=(0,h.Z)(k.rU)(l||(l=(0,f.Z)(['\n  display: block;\n  overflow: hidden;\n  position: relative;\n  border-radius: 6px;\n  padding-top: 100%;\n\n  ::before {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 1;\n    background-color: rgba(0, 0, 0, 0.02);\n    content: "";\n  }\n\n  img {\n    display: block;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n  }\n']))),L=h.Z.div(a||(a=(0,f.Z)(["\n  padding-top: 10px;\n  position: relative;\n  > strong {\n    display: block;\n    display: -webkit-box;\n    overflow: hidden;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 20px;\n    color: #747475;\n    max-height: 40px;\n    text-overflow: ellipsis;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    word-break: break-all;\n    padding-right: 30px;\n  }\n"]))),M=h.Z.div(p||(p=(0,f.Z)(["\n  display: inline-block;\n  padding-top: 4px;\n  font-weight: 700;\n  font-size: 15px;\n  line-height: 24px;\n  vertical-align: top;\n\n  span {\n    font-size: 16px;\n  }\n"]))),P=h.Z.button(s||(s=(0,f.Z)(["\n  color: #909092;\n  position: absolute;\n  top: 5px;\n  right: 0px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  svg {\n    font-size: 20px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin: 6px;\n  }\n\n  /* @media screen and (min-width: 640px) {\n    right: 6px;\n  } */\n"])));i.default=function(n){var i=n.productId,t=(0,g.useState)([]),e=(0,x.Z)(t,2),o=e[0],r=e[1],d=(0,b.c)(),l=d.toggleIcon,a=d.currentBasket,p=(0,m.p)().PriceComma,s=function(){var n=(0,u.Z)((0,c.Z)().mark((function n(){return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Z.ZP.get("".concat("https://port-0-kakao-friends-backend-3vw25lcjcu5gw.gksl2.cloudtype.app","/api/product?amount_ne=0"));case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),f=(0,w.useQuery)(["productList",i],s,{refetchOnWindowFocus:!1,onError:function(n){return console.log(n.message)}}),h=f.data;f.isLoading;return(0,g.useEffect)((function(){var n,t=(0,j.cloneDeep)(null===h||void 0===h?void 0:h.data);i&&(t=null===(n=t)||void 0===n?void 0:n.filter((function(n){return(null===n||void 0===n?void 0:n.product)!==i})));!function(n){for(var i=(null===n||void 0===n?void 0:n.length)-1;i>0;i--){var t=Math.floor(Math.random()*(i+1)),e=n[i];n[i]=n[t],n[t]=e}}(t),r(t)}),[null===h||void 0===h?void 0:h.data,i]),(0,y.jsxs)(z,{children:[(0,y.jsx)("strong",{children:"\uc7a0\uae50\ub9cc, \uc774 \uc81c\ud488\uc740 \uc5b4\ub54c\uc694?"}),(0,y.jsx)(C,{children:null===o||void 0===o?void 0:o.slice(0,8).map((function(n,i){return(0,y.jsx)(D,{children:(0,y.jsxs)(E,{children:[(0,y.jsx)(I,{to:"/detail/".concat(n.product),children:(0,y.jsx)("img",{src:n.image,alt:n.title,loading:"lazy"})}),(0,y.jsxs)(L,{children:[(0,y.jsx)("strong",{children:n.title}),(0,y.jsxs)(M,{children:[(0,y.jsx)("span",{children:p(n.price)}),"\uc6d0"]}),(0,y.jsx)(P,{onClick:function(){return l(n)},children:(null===a||void 0===a?void 0:a.filter((function(i){return i.product===n.product})).length)>0?(0,y.jsx)(v.KHD,{style:{color:"#ff447f"}}):(0,y.jsx)(v.a53,{})})]})]})},n.product)}))})]})}}}]);
//# sourceMappingURL=746.75e5cf3c.chunk.js.map