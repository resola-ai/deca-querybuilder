import{getCompatContextProvider as ue}from"react-querybuilder";import{Button as X}from"@mantine/core";import*as R from"react";var F=({className:i,handleOnClick:m,label:e,title:o,disabled:a,disabledTranslation:r,testID:n,ruleOrGroup:d,path:b,level:y,context:C,validation:D,schema:_,...M})=>R.createElement(X,{...M,"data-testid":n,type:"button",className:i,title:r&&a?r.title:o,onClick:l=>m(l),disabled:a&&!r},r&&a?r.label:e);import{Switch as Z}from"@mantine/core";import*as O from"react";var B=({className:i,handleOnChange:m,label:e,checked:o,title:a,disabled:r,testID:n,path:d,level:b,context:y,validation:C,schema:D,ruleGroup:_,...M})=>O.createElement(Z,{...M,"data-testid":n,label:e,className:i,title:a,disabled:r,checked:o,onChange:l=>m(l.target.checked)});import{Button as I}from"@mantine/core";import*as E from"react";var q=({shiftUp:i,shiftDown:m,shiftUpDisabled:e,shiftDownDisabled:o,disabled:a,className:r,labels:n,titles:d,testID:b})=>E.createElement("div",{"data-testid":b,className:r},E.createElement(I,{type:"button",size:"compact-xs",disabled:a||e,onClick:i,title:d?.shiftUp},n?.shiftUp),E.createElement(I,{type:"button",size:"compact-xs",disabled:a||o,onClick:m,title:d?.shiftDown},n?.shiftDown));import{Checkbox as oe,NumberInput as G,Radio as H,Switch as re,Textarea as ne,TextInput as $}from"@mantine/core";import{DatePickerInput as j,DateTimePicker as z}from"@mantine/dates";import f from"dayjs";import*as s from"react";import{getFirstOption as le,standardClassnames as k,useValueEditor as ie}from"react-querybuilder";import{isOptionGroupArray as ee,parseNumber as te,uniqOptList as ae}from"react-querybuilder";var Y=i=>{let m=ae(i);return ee(m)?m.map(e=>({...e,group:e.label,items:e.options})):m.map(e=>({name:e.name,value:e.name,label:e.label}))},S=i=>{if(typeof i=="number")return i;let m=te(i,{parseNumbers:"native"});return isNaN(m)?"":m};var w="YYYY-MM-DD",U=`${w}THH:mm:ss`,Q=i=>{let{fieldData:m,operator:e,value:o,handleOnChange:a,title:r,className:n,type:d,inputType:b,values:y=[],listsAsArrays:C,parseNumbers:D,separator:_,valueSource:M,disabled:l,testID:P,selectorComponent:T=i.schema.controls.valueSelector,validation:K,extraProps:u,...A}=i,{valueAsArray:g,multiValueHandler:N}=ie({handleOnChange:a,inputType:b,operator:e,value:o,type:d,listsAsArrays:C,parseNumbers:D,values:y});if(e==="null"||e==="notNull")return null;let x=m?.placeholder??"",h=["in","notIn"].includes(e)?"text":b||"text";if((e==="between"||e==="notBetween")&&(d==="select"||d==="text")&&h!=="date"){let t=["from","to"].map((v,c)=>{if(h==="number")return s.createElement(G,{key:v,placeholder:x,value:S(g[c]),className:`${k.valueListItem} input`,disabled:l,onChange:p=>N(S(p),c),...u});if(h==="datetime-local"){let p=f(g[c]),W=p.isValid()?p.toDate():null;return s.createElement(z,{placeholder:void 0,onPointerEnterCapture:void 0,onPointerLeaveCapture:void 0,key:v,value:W,className:k.valueListItem,disabled:l,withSeconds:!0,onChange:L=>N(L?f(L).format(U):"",c),...u})}return d==="text"?s.createElement($,{key:v,type:h,placeholder:x,value:g[c]??"",className:`${k.valueListItem} input`,disabled:l,onChange:p=>N(p.target.value,c),...u}):s.createElement(T,{...A,key:v,className:k.valueListItem,handleOnChange:p=>N(p,c),disabled:l,value:g[c]??le(y),options:y,listsAsArrays:C})});return s.createElement("span",{"data-testid":P,className:n,title:r},t[0],_,t[1])}switch(d){case"select":case"multiselect":return s.createElement(T,{...A,title:r,className:n,handleOnChange:a,options:y,value:o,disabled:l,multiple:d==="multiselect",listsAsArrays:C});case"textarea":return s.createElement(ne,{className:n,value:o,title:r,placeholder:x,disabled:l,onChange:t=>a(t.target.value),...u});case"switch":return s.createElement(re,{className:n,title:r,checked:o,disabled:l,onChange:t=>a(t.target.checked),...u});case"checkbox":return s.createElement(oe,{className:n,title:r,checked:o,disabled:l,onChange:t=>a(t.target.checked),...u});case"radio":return s.createElement(H.Group,{className:n,title:r,value:o,onChange:a,...u},y.map(t=>s.createElement(H,{key:t.name,value:t.name,label:t.label,disabled:l})))}if(h==="date"||h==="datetime-local"){if(e==="between"||e==="notBetween"){let t=[null,null].map((v,c)=>{if(!g[c])return v;let p=f(g[c]);return p.isValid()||(p=f(`${f().format("YYYY-MM-DD")}T${g[c]}`)),p.isValid()?p.toDate():v});return s.createElement(j,{"data-testid":P,type:"range",value:t,className:n,disabled:l,onChange:v=>{let c=v.map(p=>p?f(p).format(w):"");a(C?c:c.join(","))},...u})}return h==="datetime-local"?s.createElement(z,{placeholder:void 0,onPointerEnterCapture:void 0,onPointerLeaveCapture:void 0,"data-testid":P,value:o&&f(o).isValid()?f(o).toDate():null,className:n,disabled:l,withSeconds:!0,onChange:t=>a(t?f(t).format(U):""),...u}):s.createElement(j,{"data-testid":P,type:"default",value:o&&f(o).isValid()?f(o).toDate():null,className:n,disabled:l,onChange:t=>a(t?f(t).format(w):""),...u})}return h==="number"?s.createElement(G,{"data-testid":P,title:r,className:n,placeholder:x,disabled:l,value:S(o),onChange:t=>a(S(t)),...u}):s.createElement($,{"data-testid":P,title:r,className:n,placeholder:x,type:h,disabled:l,value:o,onChange:t=>a(t.target.value),...u})};import{MultiSelect as se,Select as me}from"@mantine/core";import*as V from"react";import{useValueSelector as pe}from"react-querybuilder";var J=({className:i,handleOnChange:m,options:e,value:o,title:a,disabled:r,multiple:n,listsAsArrays:d,testID:b,field:y,fieldData:C,rule:D,rules:_,path:M,level:l,context:P,validation:T,schema:K,...u})=>{let{onChange:A,val:g}=pe({handleOnChange:m,listsAsArrays:d,multiple:n,value:o}),N=V.useMemo(()=>Y(e),[e]),x=h=>A(h??"");return n?V.createElement(se,{...u,"data-testid":b,title:a,className:i,data:N,disabled:r,value:g,onChange:x}):V.createElement(me,{...u,"data-testid":b,title:a,className:i,value:g,data:N,disabled:r,onChange:x})};var ce={actionElement:F,notToggle:B,shiftActions:q,valueEditor:Q,valueSelector:J},Oe=ue({key:"mantine",controlElements:ce});export{F as MantineActionElement,B as MantineNotToggle,q as MantineShiftActions,Q as MantineValueEditor,J as MantineValueSelector,Oe as QueryBuilderMantine,ce as mantineControlElements};
//# sourceMappingURL=react-querybuilder_mantine.production.mjs.map