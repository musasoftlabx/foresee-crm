(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[998],{7484:function(e,r,t){"use strict";t.d(r,{L:function(){return o}});var i=t(4867),n=t(1588);function o(e){return(0,i.Z)("MuiListItemText",e)}let a=(0,n.Z)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);r.Z=a},6465:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/quotation",function(){return t(4280)}])},2895:function(e,r,t){"use strict";t.d(r,{Z:function(){return R}});var i=t(4924),n=t(6042),o=t(9396),a=t(828),s=t(5893),l=t(7294),d=t(1163),c=t(1719),u=t(2097),h=t(3789),f=t(3481),x=t(684),m=t(5050),p=t(784),w=t(5214),g=t(9630),Z=t(562),k=t(5434),j=t(5309),b=t(9894),D=t(1702),y=t(3642),v=t(9583),S=t(1872),P=t(5084),T=function(e){return{width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen}),overflowX:"hidden",borderRight:0}},C=function(e){return(0,i.Z)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:"calc(".concat(e.spacing(7)," + 1px)")},e.breakpoints.up("sm"),{width:"calc(".concat(e.spacing(8)," + 1px)")})},q=(0,c.ZP)("div")(function(e){var r=e.theme;return(0,n.Z)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:r.spacing(0,1)},r.mixins.toolbar)}),_=(0,c.ZP)(m.Z,{shouldForwardProp:function(e){return"open"!==e}})(function(e){var r=e.theme,t=e.open;return(0,n.Z)({zIndex:r.zIndex.drawer+1,transition:r.transitions.create(["width","margin"],{easing:r.transitions.easing.sharp,duration:r.transitions.duration.leavingScreen})},t&&{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:r.transitions.create(["width","margin"],{easing:r.transitions.easing.sharp,duration:r.transitions.duration.enteringScreen})})}),A=(0,c.ZP)(x.ZP,{shouldForwardProp:function(e){return"open"!==e}})(function(e){var r=e.theme,t=e.open;return(0,n.Z)({width:240,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box"},t&&(0,o.Z)((0,n.Z)({},T(r)),{"& .MuiDrawer-paper":T(r)}),!t&&(0,o.Z)((0,n.Z)({},C(r)),{"& .MuiDrawer-paper":C(r)}))});function R(e){var r=e.children,t=(0,d.useRouter)();(0,u.Z)();var i=(0,a.Z)(l.useState(!0),2),n=i[0],o=i[1],c=function(){o(function(e){return e=!e})};return(0,s.jsxs)(h.Z,{sx:{display:"flex"},children:[(0,s.jsx)(_,{position:"fixed",color:"white",sx:{boxShadow:"unset",px:0},children:(0,s.jsxs)(p.Z,{disableGutters:!0,children:[(0,s.jsx)(Z.Z,{onClick:c,children:(0,s.jsx)(k.EJ4,{})}),(0,s.jsx)(g.Z,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Foresee CRM"}),(0,s.jsx)(P.Z,{variant:"text",onClick:function(){return t.replace("/login")},children:"LOGOUT"})]})}),(0,s.jsxs)(A,{variant:"permanent",open:n,children:[(0,s.jsx)(p.Z,{}),(0,s.jsx)(w.Z,{children:[{name:"Home",route:"/",icon:(0,s.jsx)(y.icj,{style:{width:20,height:20}}),iconAlt:"",selected:!0},{name:"Create Quotation",route:"/quotation",icon:(0,s.jsx)(y.bBH,{style:{width:20,height:20}}),iconAlt:"",selected:!1},{name:"View Tickets",route:"/tickets",icon:(0,s.jsx)(y.xNr,{style:{width:20,height:20}}),iconAlt:"",selected:!1},{name:"User Management",route:"/users",icon:(0,s.jsx)(v.B8A,{style:{width:20,height:20}}),iconAlt:"",selected:!1},{name:"Categories",route:"/categories/",icon:(0,s.jsx)(v.B8A,{style:{width:20,height:20}}),iconAlt:"",selected:!1,expanded:!0,children:[{name:"All Categories",route:"/categories/",icon:(0,s.jsx)(S.fOH,{style:{width:20,height:20}}),iconAlt:"",selected:!1},{name:"Add Category",route:"/categories/add",icon:(0,s.jsx)(S.qVg,{style:{width:20,height:20}}),iconAlt:"",selected:!1},]},{name:"Stores",route:"/stores",icon:(0,s.jsx)(v.B8A,{style:{width:20,height:20}}),iconAlt:"",selected:!1},].map(function(e,r){return(0,s.jsxs)(l.Fragment,{children:[(0,s.jsxs)(j.Z,{selected:e.route===t.route,onClick:function(){return e.children?e.expanded=!e.expanded:t.push(e.route)},sx:{minHeight:48,justifyContent:n?"initial":"center",borderBottomRightRadius:20,borderTopRightRadius:20,mr:3,"&.Mui-selected":{color:"#fff",fontWeight:"bold",backgroundImage:"linear-gradient(to right, #77609a 0%, #d48383 100%)",borderBottomRightRadius:20,borderTopRightRadius:20,mr:3,boxShadow:"rgba(0, 0, 0, 0.36) 0px 10px 30px 1px",transition:"transform 1s","&:hover":{backgroundImage:"linear-gradient(to left, #77609a 0%, #d48383 100%)",transform:"scale(1.05)"}}},children:[(0,s.jsx)(b.Z,{sx:{minWidth:0,mr:n?2:"auto",justifyContent:"center",color:"inherit"},children:e.icon}),(0,s.jsx)(D.Z,{primary:e.name,sx:{opacity:n?1:0}}),e.children&&(e.expanded?(0,s.jsx)(k.Faw,{}):(0,s.jsx)(k.Yc6,{}))]},e.name),e.children&&(0,s.jsx)(f.Z,{in:e.expanded,timeout:"auto",unmountOnExit:!0,children:(0,s.jsx)(w.Z,{component:"div",disablePadding:!0,children:e.children.map(function(e,r){return(0,s.jsxs)(j.Z,{onClick:function(){return t.push(e.route)},sx:{pl:4},children:[(0,s.jsx)(b.Z,{children:e.icon}),(0,s.jsx)(D.Z,{primary:e.name})]},r)})})})]},r)})})]}),(0,s.jsxs)(h.Z,{component:"main",sx:{flexGrow:1,p:3},children:[(0,s.jsx)(q,{}),r]})]})}},4280:function(e,r,t){"use strict";t.r(r);var i=t(7568),n=t(6042),o=t(9396),a=t(414),s=t(5893),l=t(7294),d=t(930),c=t(3789),u=t(562),h=t(9041),f=t(1812),x=t(9072),m=t(9630),p=t(1719),w=t(2175),g=t(9352),Z=t(3860),k=t.n(Z),j=t(6829),b=t(2359),D=t(1358),y=t(4231),v=t(2895),S=(0,p.ZP)(function(e){return(0,s.jsx)(d.Z,(0,n.Z)({InputProps:{disableUnderline:!0}},e))})(function(e){var r=e.theme;return{"& .MuiFilledInput-root":{border:"1px solid #e2e2e1",overflow:"hidden",borderRadius:6,backgroundColor:"light"===r.palette.mode?"#fcfcfb":"#2b2b2b",transition:r.transitions.create(["border-color","background-color","box-shadow",]),":before":{borderBottom:0},"&:hover":{backgroundColor:"transparent"},"&.Mui-focused":{backgroundColor:"transparent",borderBottom:"1px solid ".concat(r.palette.primary.main)},"&.Mui-error":{backgroundColor:"#fff8f8",borderBottom:"1px solid ".concat(r.palette.error.main)}},".MuiFormHelperText-root":{textAlign:"right",fontWeight:500,lineHeight:.5,marginRight:5,marginTop:7,opacity:.7},".MuiInputBase-adornedStart":{":before":{content:"unset"},":after":{content:"unset"}}}}),P=function(e){return(0,s.jsx)(x.ZP,{xs:12,sm:6,md:4,lg:3,sx:{px:1,mt:1},children:e.children})},T=function(e){var r,t=(0,l.useState)(k()()),d=t[0],p=t[1];return console.log(e),(0,s.jsx)(v.Z,{children:(0,s.jsx)(w.J9,{initialValues:{offerDate:d,offerNo:"",notes:"",issue:"",solution:"",warranty:"",timeframe:"",workDetails:[{work:"",brand:"",quantity:1,price:0},]},validationSchema:y.Ry({offerNo:y.Z_().max(10,"Max of 10 chars").required("Required"),issue:y.Z_().max(50,"Max of 50 chars").required("Required"),solution:y.Z_().max(50,"Max of 50 chars"),warranty:y.Z_().max(10,"Max of 10 chars"),timeframe:y.Z_().max(10,"Max of 10 chars"),workDetails:y.IX().of(y.Ry().shape({work:y.Z_().required("Required."),brand:y.Z_().required("Required."),quantity:y.Z_().required("Required."),price:y.Z_().required("Required.")}))}),onSubmit:(r=(0,i.Z)(function(e,r){var t;return(0,a.__generator)(this,function(t){switch(t.label){case 0:return[4,fetch("/api/quotation/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return t.sent().json(),r.setSubmitting(!1),r.resetForm({values:{offerDate:null,offerNo:"",notes:"",issue:"",solution:"",warranty:"",timeframe:"",workDetails:[{work:"",brand:"",quantity:1,price:0}]}}),[2]}})}),function(e,t){return r.apply(this,arguments)}),children:function(e){var r=e.values,t=e.errors,i=e.touched,a=e.getFieldProps,l=e.isSubmitting;return(0,s.jsx)(w.l0,{children:(0,s.jsx)(x.ZP,{container:!0,children:(0,s.jsxs)(x.ZP,{xs:!0,children:[(0,s.jsx)(m.Z,{variant:"h6",sx:{mb:-.5},children:"Quotation details"}),(0,s.jsx)(m.Z,{variant:"caption",sx:{color:"#808080",ml:.3},children:"Click to add or remove work entities"}),(0,s.jsxs)(x.ZP,{container:!0,children:[(0,s.jsx)(P,{children:(0,s.jsx)(b._,{dateAdapter:j.y,children:(0,s.jsx)(D.O,{value:d,closeOnSelect:!0,disablePast:!0,inputFormat:"DD.MM.YYYY",onChange:function(e){return p(e)},renderInput:function(e){var r=e.inputRef,a=e.inputProps;return(0,s.jsx)(S,(0,o.Z)((0,n.Z)({ref:r},a),{label:"Offer Date",variant:"filled",fullWidth:!0,size:"small",error:i.offerDate&&Boolean(t.offerDate),helperText:i.offerDate&&t.offerDate}))}})})}),(0,s.jsx)(P,{children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Offer #",variant:"filled",fullWidth:!0,size:"small"},a("offerNo")),{error:i.offerNo&&Boolean(t.offerNo),helperText:i.offerNo&&t.offerNo}))}),(0,s.jsx)(P,{children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Issue *",variant:"filled",fullWidth:!0,size:"small"},a("issue")),{error:i.issue&&Boolean(t.issue),helperText:i.issue&&t.issue}))}),(0,s.jsx)(P,{children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Solution",variant:"filled",fullWidth:!0,size:"small"},a("solution")),{error:i.solution&&Boolean(t.solution),helperText:i.solution&&t.solution}))}),(0,s.jsx)(P,{children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Warranty",variant:"filled",fullWidth:!0,size:"small"},a("warranty")),{error:i.warranty&&Boolean(t.warranty),helperText:i.warranty&&t.warranty}))}),(0,s.jsx)(P,{children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Timeframe",variant:"filled",fullWidth:!0,size:"small"},a("timeframe")),{error:i.timeframe&&Boolean(t.timeframe),helperText:i.timeframe&&t.timeframe}))})]}),(0,s.jsx)(P,{children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Notes (Optional)",variant:"filled",size:"small",fullWidth:!0,multiline:!0,rows:3},a("notes")),{error:i.notes&&Boolean(t.notes),helperText:i.notes&&t.notes}))}),(0,s.jsx)(w.F2,{name:"workDetails",children:function(e){e.insert;var l=e.remove,d=e.push;return(0,s.jsxs)(c.Z,{sx:{mt:5},children:[(0,s.jsx)(m.Z,{variant:"h6",sx:{mb:-.5},children:"Work details"}),(0,s.jsx)(m.Z,{variant:"caption",sx:{color:"#808080",ml:.3},children:"Click + to add or remove work entities"}),r.workDetails.length>0&&r.workDetails.map(function(e,c){return(0,s.jsxs)(x.ZP,{container:!0,alignItems:"center",children:[(0,s.jsx)(x.ZP,{xs:12,md:3,lg:5,sx:{px:1,mt:1},children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Work Scope *",variant:"filled",size:"small",fullWidth:!0,placeholder:"Scope of work done"},a("workDetails.".concat(c,".work"))),{error:t&&t.workDetails&&t.workDetails[c]&&t.workDetails[c].work&&i&&i.workDetails&&i.workDetails[c]&&i.workDetails[c].work}))}),(0,s.jsx)(x.ZP,{xs:12,md:3,lg:3,sx:{px:1,mt:1},children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Brand *",variant:"filled",size:"small",fullWidth:!0,placeholder:"Brand that worked on"},a("workDetails.".concat(c,".brand"))),{error:t&&t.workDetails&&t.workDetails[c]&&t.workDetails[c].brand&&i&&i.workDetails&&i.workDetails[c]&&i.workDetails[c].brand,helperText:t&&t.workDetails&&t.workDetails[c]&&t.workDetails[c].brand&&i&&i.workDetails&&i.workDetails[c]&&i.workDetails[c].brand}))}),(0,s.jsx)(x.ZP,{xs:12,md:2,lg:1,sx:{px:1,mt:1},children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Quantity *",variant:"filled",size:"small",fullWidth:!0},a("workDetails.".concat(c,".quantity"))),{error:t&&t.workDetails&&t.workDetails[c]&&t.workDetails[c].quantity&&i&&i.workDetails&&i.workDetails[c]&&i.workDetails[c].quantity,helperText:t&&t.workDetails&&t.workDetails[c]&&t.workDetails[c].quantity&&i&&i.workDetails&&i.workDetails[c]&&i.workDetails[c].quantity}))}),(0,s.jsx)(x.ZP,{xs:12,md:2,lg:2,sx:{px:1,mt:1},children:(0,s.jsx)(S,(0,o.Z)((0,n.Z)({label:"Price *",variant:"filled",size:"small",fullWidth:!0},a("workDetails.".concat(c,".price"))),{InputProps:{startAdornment:(0,s.jsx)(h.Z,{position:"start",sx:{pt:.2,borderBottom:0},children:"KES"})},error:t&&t.workDetails&&t.workDetails[c]&&t.workDetails[c].price&&i&&i.workDetails&&i.workDetails[c]&&i.workDetails[c].price,helperText:t&&t.workDetails&&t.workDetails[c]&&t.workDetails[c].price&&i&&i.workDetails&&i.workDetails[c]&&i.workDetails[c].price}))}),(0,s.jsxs)(x.ZP,{xs:12,md:1,children:[r.workDetails.length>1&&(0,s.jsx)(u.Z,{color:"error",sx:{background:"#ffeeee","&:hover":{background:"#fbdbdb"},mt:1,mr:1},children:(0,s.jsx)(g.w6k,{onClick:function(){return l(c)}})}),c===r.workDetails.length-1&&(0,s.jsx)(u.Z,{sx:{background:"#f2eff9","&:hover":{background:"#d1d9fc"},mt:1},children:(0,s.jsx)(g.uGf,{onClick:function(){return d({work:"",brand:"",quantity:1,price:0})}})})]})]},c)})]})}}),(0,s.jsx)(x.ZP,{sx:{px:1,mt:5},children:(0,s.jsx)(f.Z,{type:"submit",size:"large",disabled:t||l,loading:l,loadingIndicator:"SUBMITTING.....",variant:"outlined",children:"CREATE QUOTATION"})})]})})})}})})};r.default=T},943:function(e,r,t){"use strict";function i(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,i=Array(r);t<r;t++)i[t]=e[t];return i}t.d(r,{Z:function(){return i}})},3375:function(e,r,t){"use strict";function i(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}t.d(r,{Z:function(){return i}})},1566:function(e,r,t){"use strict";t.d(r,{Z:function(){return n}});var i=t(943);function n(e,r){if(e){if("string"==typeof e)return(0,i.Z)(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return(0,i.Z)(e,r)}}}},function(e){e.O(0,[937,228,994,415,930,14,72,264,508,50,774,888,179],function(){return e(e.s=6465)}),_N_E=e.O()}]);