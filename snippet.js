/**
 * Use the autotrader filters to find a set of cars you're interested in.
 * Then paste this all of this into the developer console and the key facts
 * about the current page of search results will be dumped to the console
 * and copied to the clipboard as a TSV.
 * 
 * You'll have to manually go to each page of search results and run the
 * same script, saving the results into a spreadsheet yourself.
 */


(function(){
	let results = document.querySelectorAll(".search-page__result");
	let data = [];
	results.forEach(function(result) {
        let car = {
			price: result.querySelector(".product-card-pricing__price").innerText.replace(/\D/g,""),
            year: result.querySelector(".listing-key-specs .atc-type-picanto--medium:nth-child(1)").innerText.match(/^\d\d\d\d/)[0],
            mileage: result.querySelector(".listing-key-specs .atc-type-picanto--medium:nth-child(3)").innerText.replace(/\D/g,""),
            engine: result.querySelector(".listing-key-specs .atc-type-picanto--medium:nth-child(4)").innerText.replace(/\s/g,""),
            link: "https://www.autotrader.co.uk" + result.querySelector(".listing-fpa-link").getAttribute("href"),
            isPromoted: result.getAttribute("data-is-promoted-listing"),
            isFeatured: result.getAttribute("data-is-featured-listing"),
            isYouMayAlsoLike: result.getAttribute("data-is-ymal")
		};
		data.push(car);
	});
	console.log("Found this data...");
	console.table(data);
    let csv = "engine\tyear\tmileage\tprice\tlink\tis promoted\tis featured\tis you may also like\n" + data.map(function(car){
        return [car.engine, car.year, car.mileage, car.price, car.link, car.isPromoted, car.isFeatured, car.isYouMayAlsoLike].join("\t");
    }).join("\n");
    copy(csv);
	console.log(`Copied ${data.length} results to clipboard`);
})();


