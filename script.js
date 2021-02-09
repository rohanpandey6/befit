var nutrients_uri = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

var workout_uri = 'https://trackapi.nutritionix.com/v2/natural/exercise'



/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}






var main_div = document.createElement('div');
main_div.style.position = 'absolute';
main_div.style.height = '450px';
main_div.style.width = '550px';
main_div.style.borderTopLeftRadius = "5px";
main_div.style.borderTopRightRadius = "5px";
main_div.style.margin = 'auto';	
main_div.style.textAlign = 'center';
main_div.style.top = '0';
main_div.style.left = '0';
main_div.style.right = '0';
main_div.style.bottom = '0';
main_div.style.overflow ='hidden';




var get_result = document.createElement('button');
get_result.style.position = 'absolute';
get_result.setAttribute('id','submit');
get_result.setAttribute('class','result');
get_result.setAttribute('type','submit');
get_result.innerHTML = 'GET INFO';
get_result.style.width = '100%';
get_result.style.fontSize = '2rem';
get_result.style.left = '0';
get_result.style.right = '0';
get_result.style.bottom = '0';
get_result.style.backgroundColor = '#24a0ed';
get_result.addEventListener('click',fetch_data)



function fetch_data(){
	var input_area = document.getElementsByClassName('searchbox');
	if (!input_area.item(0).value){
		main_div.innerHTML = '<h3>Please enter food item<h3>';
		return 
	}
	input_area.item(0).style.width = '100%';
	var query = {
		query: input_area.item(0).value
	};
	fetch(nutrients_uri, {
	method: "POST",
    body: JSON.stringify(query),
    headers: {
      "content-type": "application/json",
	  "x-app-id":"c3270d2b",
	  "x-app-key":"27f08e28cd0efc1f74b86532d002549c",
	  "x-remote-user-id":"0"
    }
	}).then((response) => response.json())
	.then((data) => {
		main_div.innerHTML = '';
		main_div.style.overflow ='scroll';
		main_div.style.overflowX ='hidden';
		let html = "";
		if (data.foods) {
			data.foods.forEach((food) => {
			html += `
                    <div class="food-item" >
                        <div class="food-name">
                            <h3 >${food.food_name}</h3>
							<div class="food-img">
                            <img src="${food.photo.thumb}" alt="food" />
						</div>
							<h3>Calories: ${food.nf_calories}</h3>
							<h3>Fiber: ${food.nf_dietary_fiber}</h3>
							<h3>Protein: ${food.nf_protein}</h3>
							<h3>Saturated Fat: ${food.nf_saturated_fat}</h3>
                           
                        </div>
                    </div>
					`;
				});	
		
	}
		else {
		main_div.style.overflow ='hidden';
		html = `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn6m9hc5cXocXitQH-o_8BwEXEngy2YFVQzA&usqp=CAU" ><img><br>
		<h3>Sorry, we didn't find any Food !</h3>`;
	}
	main_div.innerHTML += html;
	});
}

document.body.append(main_div,get_result);