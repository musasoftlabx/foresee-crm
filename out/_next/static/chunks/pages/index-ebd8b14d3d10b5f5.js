(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(266)}])},2895:function(e,t,n){"use strict";n.d(t,{Z:function(){return F}});var r=n(4924),i=n(6042),o=n(9396),a=n(828),s=n(5893),c=n(7294),l=n(1163),d=n(1719),u=n(2097),x=n(3789),h=n(3481),p=n(684),g=n(5050),f=n(784),m=n(5214),b=n(9630),j=n(562),Z=n(5434),y=n(5309),v=n(9894),w=n(1702),S=n(3642),C=n(9583),k=n(1872),M=n(5084),R=function(e){return{width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen}),overflowX:"hidden",borderRight:0}},A=function(e){return(0,r.Z)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:"calc(".concat(e.spacing(7)," + 1px)")},e.breakpoints.up("sm"),{width:"calc(".concat(e.spacing(8)," + 1px)")})},T=(0,d.ZP)("div")(function(e){var t=e.theme;return(0,i.Z)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:t.spacing(0,1)},t.mixins.toolbar)}),I=(0,d.ZP)(g.Z,{shouldForwardProp:function(e){return"open"!==e}})(function(e){var t=e.theme,n=e.open;return(0,i.Z)({zIndex:t.zIndex.drawer+1,transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen})},n&&{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen})})}),P=(0,d.ZP)(p.ZP,{shouldForwardProp:function(e){return"open"!==e}})(function(e){var t=e.theme,n=e.open;return(0,i.Z)({width:240,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box"},n&&(0,o.Z)((0,i.Z)({},R(t)),{"& .MuiDrawer-paper":R(t)}),!n&&(0,o.Z)((0,i.Z)({},A(t)),{"& .MuiDrawer-paper":A(t)}))});function F(e){var t=e.children,n=(0,l.useRouter)();(0,u.Z)();var r=(0,a.Z)(c.useState(!0),2),i=r[0],o=r[1],d=function(){o(function(e){return e=!e})};return(0,s.jsxs)(x.Z,{sx:{display:"flex"},children:[(0,s.jsx)(I,{position:"fixed",color:"white",sx:{boxShadow:"unset",px:0},children:(0,s.jsxs)(f.Z,{disableGutters:!0,children:[(0,s.jsx)(j.Z,{onClick:d,children:(0,s.jsx)(Z.EJ4,{})}),(0,s.jsx)(b.Z,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Foresee CRM"}),(0,s.jsx)(M.Z,{variant:"text",onClick:function(){return n.replace("/login")},children:"LOGOUT"})]})}),(0,s.jsxs)(P,{variant:"permanent",open:i,children:[(0,s.jsx)(f.Z,{}),(0,s.jsx)(m.Z,{children:[{name:"Home",route:"/",icon:(0,s.jsx)(S.icj,{style:{width:20,height:20}}),iconAlt:"",selected:!0},{name:"Create Quotation",route:"/quotation",icon:(0,s.jsx)(S.bBH,{style:{width:20,height:20}}),iconAlt:"",selected:!1},{name:"View Tickets",route:"/tickets",icon:(0,s.jsx)(S.xNr,{style:{width:20,height:20}}),iconAlt:"",selected:!1},{name:"User Management",route:"/users",icon:(0,s.jsx)(C.B8A,{style:{width:20,height:20}}),iconAlt:"",selected:!1},{name:"Categories",route:"/categories/",icon:(0,s.jsx)(C.B8A,{style:{width:20,height:20}}),iconAlt:"",selected:!1,expanded:!0,children:[{name:"All Categories",route:"/categories/",icon:(0,s.jsx)(k.fOH,{style:{width:20,height:20}}),iconAlt:"",selected:!1},{name:"Add Category",route:"/categories/add",icon:(0,s.jsx)(k.qVg,{style:{width:20,height:20}}),iconAlt:"",selected:!1},]},{name:"Stores",route:"/stores",icon:(0,s.jsx)(C.B8A,{style:{width:20,height:20}}),iconAlt:"",selected:!1},].map(function(e,t){return(0,s.jsxs)(c.Fragment,{children:[(0,s.jsxs)(y.Z,{selected:e.route===n.route,onClick:function(){return e.children?e.expanded=!e.expanded:n.push(e.route)},sx:{minHeight:48,justifyContent:i?"initial":"center",borderBottomRightRadius:20,borderTopRightRadius:20,mr:3,"&.Mui-selected":{color:"#fff",fontWeight:"bold",backgroundImage:"linear-gradient(to right, #77609a 0%, #d48383 100%)",borderBottomRightRadius:20,borderTopRightRadius:20,mr:3,boxShadow:"rgba(0, 0, 0, 0.36) 0px 10px 30px 1px",transition:"transform 1s","&:hover":{backgroundImage:"linear-gradient(to left, #77609a 0%, #d48383 100%)",transform:"scale(1.05)"}}},children:[(0,s.jsx)(v.Z,{sx:{minWidth:0,mr:i?2:"auto",justifyContent:"center",color:"inherit"},children:e.icon}),(0,s.jsx)(w.Z,{primary:e.name,sx:{opacity:i?1:0}}),e.children&&(e.expanded?(0,s.jsx)(Z.Faw,{}):(0,s.jsx)(Z.Yc6,{}))]},e.name),e.children&&(0,s.jsx)(h.Z,{in:e.expanded,timeout:"auto",unmountOnExit:!0,children:(0,s.jsx)(m.Z,{component:"div",disablePadding:!0,children:e.children.map(function(e,t){return(0,s.jsxs)(y.Z,{onClick:function(){return n.push(e.route)},sx:{pl:4},children:[(0,s.jsx)(v.Z,{children:e.icon}),(0,s.jsx)(w.Z,{primary:e.name})]},t)})})})]},t)})})]}),(0,s.jsxs)(x.Z,{component:"main",sx:{flexGrow:1,p:3},children:[(0,s.jsx)(T,{}),t]})]})}},5082:function(e,t,n){"use strict";n.d(t,{u:function(){return d}});var r=n(6042),i=n(9396),o=n(5893),a=n(1719),s=n(562),c=n(9352),l=(0,a.ZP)(c.tgW)({color:"white",transform:"rotate(90deg)",transition:"transform 0.3s","&:hover":{transform:"rotate(180deg)",transition:"transform 0.3s"}}),d=function(e){return(0,o.jsx)(s.Z,(0,i.Z)((0,r.Z)({},e),{edge:"end",children:(0,o.jsx)(l,{})}))}},7696:function(e,t,n){"use strict";n.d(t,{l:function(){return h}});var r=n(6042),i=n(9396),o=n(5893),a=n(1719),s=n(754),c=n(9072),l=n(1812),d=n(9144),u=n(9630),x=n(9352);(0,a.ZP)(x.tgW)({color:"white",transform:"rotate(90deg)",transition:"transform 0.3s","&:hover":{transform:"rotate(180deg)",transition:"transform 0.3s"}});var h=function(e){return(0,o.jsx)(c.ZP,{display:"flex",justifyContent:e.placement,sx:{px:1,pt:2},children:(0,o.jsx)(l.Z,(0,i.Z)((0,r.Z)({},e),{type:"submit",loadingIndicator:(0,o.jsxs)(d.Z,{spacing:1,direction:"row",children:[(0,o.jsx)(u.Z,{variant:"subtitle2",sx:{textOverflow:"none"},children:e.loadingtext}),(0,o.jsx)(s.Z,{size:20})]}),variant:"outlined",sx:{borderRadius:4,borderStyle:"double",borderWidth:4,boxShadow:"rgba(52, 117, 210, 0.7) 0px 30px 90px","&:hover":{borderStyle:"double",borderWidth:4,boxShadow:"rgba(2, 87, 210, 1) 0px 30px 90px"},width:"70%"},children:e.children}))})}},41:function(e,t,n){"use strict";n.d(t,{M:function(){return u}});var r=n(6042),i=n(9396),o=n(5893),a=n(1020),s=n(1719),c=n(9041),l=n(930),d=(0,s.ZP)(function(e){return(0,o.jsx)(l.Z,(0,r.Z)({InputProps:{disableUnderline:!0,startAdornment:e.prefixcon&&(0,o.jsx)(c.Z,{position:"start",sx:{marginTop:e.value?"18px !important":"0px !important",color:e.error?"#d3302f":""},children:e.prefixcon}),endAdornment:e.suffixcon&&(0,o.jsx)(c.Z,{position:"end",children:e.suffixcon})}},e))})(function(e){return{"& .MuiFilledInput-root":{border:"1px solid #bdbdbd",overflow:"hidden",borderRadius:e.circularedge||10,backgroundColor:"light"===e.theme.palette.mode?"rgba(252,252,252,0.95)":"rgba(43,43,43,0.95)",transition:e.theme.transitions.create(["border-color","background-color","box-shadow",]),":before":{borderBottom:0},"&:hover":{backgroundColor:"light"===e.theme.palette.mode?"rgba(252,252,252,0.9)":"rgba(43,43,43,0.4)"},"&.Mui-focused":{backgroundColor:"light"===e.theme.palette.mode?"rgba(231,234,246,0.9)":"rgba(43,43,43,0.4)",borderBottom:"1px solid ".concat(e.theme.palette.primary.main)},"&.Mui-error":{backgroundColor:"light"===e.theme.palette.mode?"rgba(255,248,248,0.9)":"rgba(43,43,43,0.4)",border:"2px dotted ".concat(e.theme.palette.error.main)}},".MuiFormLabel-root":{fontSize:14,top:2,transform:"translate(".concat(e.prefixcon?42:13,"px, 14px) scale(1.05)"),"&.Mui-focused":{fontSize:16,transform:"translate(13px, 4px) scale(0)"}},".MuiFormLabel-root.MuiFormLabel-filled":{fontSize:16,transform:"translate(13px, 4px) scale(0.75)"},".MuiFormHelperText-root":{textAlign:"right",fontWeight:500,lineHeight:.5,marginBottom:-7,marginRight:5,marginTop:7,opacity:.7},".MuiInputBase-adornedStart":{":before":{content:"unset"},":after":{content:"unset"}},"&.MuiFormControl-root":{label:{cursor:"text"},input:{"&[value='']":{marginTop:-10,marginBottom:8},":-internal-autofill":{backgroundColor:"#e8f0fe !important"},"::placeholder":{fontSize:15},":not(focus)":{"::placeholder":{visibility:"hidden"}},":focus":{"::placeholder":{visibility:"visible"}}}}}}),u=function(e){return(0,o.jsx)(a.Z,{display:"flex",xs:e.columnspan||12,sx:{px:1},children:(0,o.jsx)(d,(0,i.Z)((0,r.Z)({variant:"filled",fullWidth:!0,size:"small",placeholder:e.placeholder||e.label},e),{children:e.children}))})}},266:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return I}});var r=n(5893),i=n(7294),o=n(9008),a=n.n(o),s=n(196),c=n(1503),l=n(2662),d=n.n(l),u=n(3789),x=n(5084),h=n(1020),p=n(918),g=n(930),f=n(9630),m=n(2895),b=n(6042),j=n(9396),Z=n(2175),y=n(4231),v=n(8228),w=n(2961),S=n(5425),C=n(9144),k=n(1538),M=n(41),R=n(7696),A=n(5082),T=function(e){var t=e.categories,n=e.open,i=e.setOpen,o=(0,v.D)(function(e){return s.ZP.post("Tickets",e)}).mutate;return(0,r.jsx)(w.Z,{open:n,TransitionComponent:S.Z,onClose:function(){return i(!1)},children:(0,r.jsx)(Z.J9,{initialValues:{category:"",subcategory:"",details:""},validationSchema:y.Ry({details:y.Z_().max(50,"Must be 50 characters or less")}),onSubmit:function(e,t){var n=t.setSubmitting,r=t.resetForm;return o(e,{onSuccess:function(e){r(),i(!1)},onError:function(e){n(!1),showAlert({status:e.response.data.status,subject:e.response.data.subject,body:e.response.data.body})}})},children:function(e){var n,i=e.values,o=e.errors,a=e.touched,s=e.isSubmitting,c=e.getFieldProps;return(0,r.jsxs)(Z.l0,{children:[(0,r.jsxs)(C.Z,{direction:"row",display:"flex",alignItems:"center",justifyContent:"space-between",sx:{mx:3,mt:3},children:[(0,r.jsx)(f.Z,{sx:{color:"white",fontFamily:"Lobster",fontSize:26,mt:-.5},children:"Raise a ticket"}),(0,r.jsx)(A.u,{})]}),(0,r.jsxs)(C.Z,{spacing:2,sx:{p:3},children:[(0,r.jsx)(M.M,(0,j.Z)((0,b.Z)({label:"Category *",select:!0},c("category")),{children:t&&t.map(function(e,t){return(0,r.jsx)(k.Z,{value:e.category,children:e.category},t)})})),i.category&&(0,r.jsx)(M.M,(0,j.Z)((0,b.Z)({label:"Sub-Category *",error:a.subcategory&&Boolean(o.subcategory),select:!0,helperText:a.subcategory&&o.subcategory},c("subcategory")),{children:t&&(null===(n=t[t.findIndex(function(e){return e.category===i.category})])||void 0===n?void 0:n.subcategories.map(function(e,t){return(0,r.jsx)(k.Z,{value:e,sx:{"&.Mui-selected":{backgroundImage:"linear-gradient(-15deg, #fdfcfb 0%, #efe7fa 10%)",borderRadius:5,mx:1},"&:hover":{backgroundImage:"linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",borderRadius:5,transition:"transform 0.5s",transform:"scale(1.05)",mx:1}},children:e},t)}))})),(0,r.jsx)(M.M,(0,j.Z)((0,b.Z)({label:"Extra Details (Optional)",multiline:!0,rows:5},c("details")),{helperText:"".concat(i.details.length," chars"),children:t&&t.map(function(e,t){return(0,r.jsx)(k.Z,{value:e.category,children:e.category},t)})})),(0,r.jsx)(R.l,{type:"submit",placement:"center",disabled:"{}"===JSON.stringify(a)||"{}"!==JSON.stringify(o)||s,loading:s,children:"ADD USER"})]})]})}})})},I=function(){var e=(0,i.useState)(""),t=e[0],n=e[1],o=(0,i.useState)(!1),l=o[0],b=o[1],j=(0,c.a)(["Categories"],function(e){var t=e.queryKey;return s.ZP.get(t[0])},{select:function(e){return e.data.rows}}).data,Z=(0,c.a)(["Tickets"],function(e){var t=e.queryKey;return s.ZP.get(t[0])},{select:function(e){return e.data}}),y=Z.data,v=Z.isFetched,w=function(e){console.log(e),n(e.target.value)};return(0,i.useEffect)(function(){d().init(document.querySelectorAll(".tilter"),{scale:1.1,perspective:2e3,speed:500})},[]),(0,r.jsx)(m.Z,{children:(0,r.jsxs)(u.Z,{sx:{},children:[(0,r.jsxs)(a(),{children:[(0,r.jsx)("title",{children:"Maintenance System"}),(0,r.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsx)(T,{categories:j,open:l,setOpen:b}),(0,r.jsxs)(h.Z,{container:!0,children:[(0,r.jsxs)(h.Z,{display:"flex",flexDirection:"column",alignItems:"center",xs:12,sx:{py:10},children:[(0,r.jsx)(f.Z,{variant:"h4",color:"initial",sx:{mb:2},children:"Locate your shop"}),(0,r.jsx)(h.Z,{xs:10,md:3,children:(0,r.jsx)(g.Z,{placeholder:"Search",variant:"outlined",fullWidth:!0,value:t,onChange:w})})]}),(0,r.jsx)(h.Z,{container:!0,rowSpacing:3,children:v?y.map(function(e,t){return(0,r.jsx)(h.Z,{xs:12,sm:4,md:3,xl:2,display:"flex",justifyContent:"center",children:(0,r.jsxs)(p.Z,{className:"tilter",elevation:12,sx:{borderRadius:5,minWidth:200,overflow:"hidden"},children:[(0,r.jsxs)(u.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",px:5,mb:8},children:[(0,r.jsx)("img",{src:"/images/blob.png",width:150,style:{zIndex:0,opacity:.3,marginTop:20}}),(0,r.jsx)("img",{src:"/images/sampleshop.png",height:24,style:{marginTop:-80,zIndex:333}})]}),(0,r.jsxs)(u.Z,{sx:{display:"flex",flexDirection:"column",mx:2.1,mb:2},children:[(0,r.jsxs)(f.Z,{variant:"caption",children:["Ticket ",e._id]}),(0,r.jsx)(f.Z,{variant:"subtitle1",children:"Store name"}),(0,r.jsx)(f.Z,{variant:"caption",children:"LOCATION"}),(0,r.jsx)(x.Z,{variant:"contained",size:"small",color:"primary",onClick:function(){return b(!0)},sx:{borderRadius:10,marginTop:1,width:80},children:"PICK"})]})]})},t)}):(0,r.jsx)("span",{children:"Loading"})})]})]})})}}},function(e){e.O(0,[937,228,994,415,930,14,72,264,198,6,508,545,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);