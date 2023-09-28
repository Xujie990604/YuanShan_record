(function(w) {
	var immersed =Number(localStorage.statusBarHeight);
	w.immersed = immersed;
	var t = document.getElementsByTagName('header')[0];
	t&&(t.style.height=(44+immersed)+'px',t.style.paddingTop=immersed+'px');
	t && (t.style.paddingTop = immersed + 'px');
	t = document.getElementsByClassName('mui-content')[0];
	t && (t.style.paddingTop = (44+immersed) + 'px');
})(window);