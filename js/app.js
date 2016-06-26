var $ = function(target, multi) {
	if (multi === 1) {
		return document.querySelectorAll(target);
	} else {
		return document.querySelector(target);
	};
};

var slide = function(picNo) {
	var picUrl = "";
	switch (picNo) {
	case 0:
		picUrl = "images/black_chair.png";
		break;
	case 1:
		picUrl = "images/orange.png";
		break;
	case 2:
		picUrl = "images/red.png";
		break;
	};
	
	$('.carousel_show img').src=picUrl;
};
var prices = {
		"Chair Clair": 150,
		"Chair Margarita": 200,
		"Chair Selena": 220,
		"tkanina": 0,
		"skóra": 50,
		"": 0,
}
var selectedType = "";
var selectedColor = "";
var selectedMat = "";
var selectedTrans = false;
var updateCounter = function () {
	var tbody = $('.counter table tbody');
	tbody.children[2].children[0].innerText = "";
	tbody.children[2].children[1].innerText = "";
	if (selectedType != "") {
		tbody.children[0].children[0].innerText = selectedType;
		tbody.children[0].children[1].innerText = prices[selectedType];
	}
	if (selectedMat != "") {
		tbody.children[1].children[0].innerText = selectedMat;
		tbody.children[1].children[1].innerText = prices[selectedMat];
	}
	if (selectedTrans != false) {
		tbody.children[2].children[0].innerText = "Transport";
		tbody.children[2].children[1].innerText = 80;
	}
	var total = (1 * prices[selectedType]) + (1 * prices[selectedMat]) + (80 * selectedTrans);
	$('#total').innerText = total + " zł";
}

document.addEventListener('DOMContentLoaded', function(){
	var menus = $('.main_width.nav_bar ul > li', 1);
	for (var i = 0; i < menus.length; i++) {
		if (menus[i].querySelector('.submenu') != null) {
			menus[i].addEventListener('mouseover', function() {
				this.querySelector('.submenu').style.display="block";
			});
			menus[i].addEventListener('mouseout', function() {
				this.querySelector('.submenu').style.display="none";
			})
		}	
	};
	var pictureBoxes = $('.pictures_box', 1);
	for (var i = 0; i < pictureBoxes.length; i++) {
		pictureBoxes[i].addEventListener('mouseover', function() {
			this.firstElementChild.style.display="none";
		})
		pictureBoxes[i].addEventListener('mouseout', function() {
			this.firstElementChild.style.display="block";
		})
	}
	var shownPic = 0;
	$('#next').addEventListener('click', function() {
		shownPic += 1;
		if (shownPic === 3) {
			shownPic = 0;
		}
		slide(shownPic);
	})
	$('#prev').addEventListener('click', function() {
		shownPic -= 1;
		if (shownPic === -1) {
			shownPic = 2;
		}
		slide(shownPic);
	})
	
	var arrows = $('.select > a', 1);
	for (var i = 0; i < arrows.length; i++) {
		arrows[i].addEventListener('click', function (e) {
			e.preventDefault();
			this.parentElement.querySelector('.select_options').classList.toggle('hidden');
			this.parentElement.querySelector('.select_options').classList.toggle('shown');
		})
	}
	$('.ch_form .checkbox').addEventListener('click', function() {
		if (selectedTrans == false) {
			selectedTrans = true;
			this.style.backgroundImage = "url('images/form_ok.jpg')"
		} else {
			selectedTrans = false;
			this.style.backgroundImage = "";
		}
		updateCounter();
	})
	var options = $('.select_options li', 1);
	for (var i = 0; i < options.length; i++) {
		options[i].addEventListener('click', function (e) {
			switch (this.parentElement.parentElement.id) {
			case 'selectedMat':
				selectedMat = this.innerText;
				break;
			case 'selectedColor':
				selectedColor = this.innerText;
				break;
			case 'selectedType':
				selectedType = this.innerText;
				break;
			}
			this.parentElement.parentElement.parentElement.firstElementChild.innerText = this.innerText;
			this.parentElement.parentElement.classList.toggle('hidden');
			this.parentElement.parentElement.classList.toggle('shown');
			updateCounter();
			console.log(selectedType, selectedColor, selectedMat)
		})
	}
	
	
})