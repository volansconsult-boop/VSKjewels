(function(){
'use strict';
const dialog=document.getElementById('purchase-dialog');
const opener=document.getElementById('request-open');
if(!dialog||!opener)return;
opener.addEventListener('click',()=>dialog.showModal());
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>opener.focus());
document.getElementById('purchase-form').addEventListener('submit',function(event){
 event.preventDefault(); if(!this.reportValidity())return;
 const data=new FormData(this);
 const productName=document.querySelector('.product-summary h1').textContent.trim();
 const sku=document.querySelector('.product-sku').textContent.replace(/^SKU:\s*/, '').trim();
 const price=document.querySelector('.product-price').textContent.trim();
 const details=document.querySelector('.product-summary h1 + p').textContent.trim();
 const body=['Purchase request: '+productName,'SKU: '+sku,'Listed unit price: '+price,'Quantity: '+data.get('quantity'),'Details: '+details,'Name: '+data.get('name'),'Email: '+data.get('email'),'Phone: '+(data.get('phone')||'Not provided'),'Message: '+(data.get('message')||'None'),'Please confirm availability, delivery and final total before payment.'].join('\n');
 document.getElementById('request-copy').value=body;
 document.getElementById('request-copy-wrap').hidden=false;
 document.getElementById('request-status').textContent='Your email app should open. Please send the email there to complete your request. If it does not open, copy the text below and email Vskjewels@gmail.com.';
 window.location.href='mailto:Vskjewels@gmail.com?subject='+encodeURIComponent('Sovra purchase request — '+sku)+'&body='+encodeURIComponent(body);
});
})();