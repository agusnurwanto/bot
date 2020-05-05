function invite_people(total) {
	var check_profile = jQuery('#reaction_profile_browser li a._42ft._4jy0._55pi._2agf._4o_4._p._4jy3._517h._51sy._59pe');
	var invites = jQuery('#reaction_profile_browser li a._42ft._4jy0._4jy3._517h._51sy[rel="async-post"]');
	var more = jQuery('.uiMorePagerPrimary');
	var wrap = more.closest('.uiScrollableAreaWrap')[0];

	// jika belum klik raction
	if(total == 0 && check_profile.length == 0){
		console.log('total 0 dan check_profile 0');
		jQuery('a[data-testid="UFI2ReactionsCount/root"]')[0].click();
		setTimeout(function(){
			console.log('invite_people('+total+')');
			invite_people(total);
		}, 10000);

	// jika invite kosong dan masih ada tombol load more
	}else if(invites.length == 0 && more >= 1){
		console.log('invite kosong dan masih ada tombol load more');
		wrap.scrollTop = jQuery(check_profile[check_profile.length-1]).offset().top;
		more[0].click();
		console.log('Load more people ...');
		setTimeout(function(){
			invite_people(total);
		}, 10000);
	}
	invites.map(function(i, b){
		setTimeout(function(){ 
			total++;
			wrap.scrollTop = jQuery(jQuery(b)[0]).offset().top;
			jQuery(b)[0].click();
			console.log('invite '+total+' orang');
			if((i+1) == invites.length){
				if(more.length >= 1){
					wrap.scrollTop = jQuery(check_profile[check_profile.length-1]).offset().top;
					more[0].click();
					console.log('Load more people ...');
					setTimeout(function(){
						invite_people(total);
					}, 10000);
				}else{
					alert('Kamu berhasil melakukan invite terhadap '+total+' orang');
				}
			}
		}, i*1000);
	});
}
invite_people(0);