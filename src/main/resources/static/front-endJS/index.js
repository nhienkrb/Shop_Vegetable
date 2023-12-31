var host = "http://localhost:8081/api/product";

const app = angular.module("app", []);

app.controller("ctrl", function($scope, $http) {

	$scope.productHome = [];

	$scope.listImg = function() {
		let url = `${host}/best-seller`
		$http.get(url).then(resp => {
			$scope.productHome = resp.data;
			console.log('successfully listImg: ', resp)
		}).catch(error => {
			console.log('Error listImg: ', error)
		})
	}

	$scope.getOneProduct = function(id) {
		let url = `${host}/${id}`
		$http.get(url).then(resp => {
			$scope.productHome = resp.data;
			console.log('successfully getOneProduct: ', resp)
		}).catch(error => {
			console.log('Error getOneProduct: ', error)
		})
	}




	$scope.listImg();

});


app.controller("cart", function($scope, $http) {

	$scope.cart = {
		Product: [],

		// Đẩy dữ liệu vào LocalStore
		AddLocalStore(id) {
			let url = `${host}/${id}`;
			let item = this.Product.find(item => item.id == id);
			if (item) {
				item.qty++;
				this.saveLocalStore();
			} else {
				$http.get(url).then(resp => {
					resp.data.qty = 1;
					this.Product.push(resp.data);
					this.saveLocalStore();
					console.log('successfully Add LocalStore: ', resp)
				}).catch(error => {
					console.log('Error Add LocalStore: ', error)
				});
			}
		},


		// luu vao localStore
		saveLocalStore() {
			var json = JSON.stringify(angular.copy(this.Product));
			localStorage.setItem("NameProduct", json);
		},


		// Đếm số phần tử trong cart
		get getCount() {
			return this.Product.map(item => item.qty).reduce((total, qty) => total += qty, 0);
		},

		get getCountCart() {
			return this.Product.map(item => item.qty).reduce((total, qty) => total += qty, 0);
		},

		// Tổng tiền số phần tử trong cart
		get amount() {
			return this.Product
				.map(item => item.qty * item.price)
				.reduce((total, qty) => total += qty, 0);
		},

		// Load len lai cart
		loadFormLocalStorage() {
			var json = localStorage.getItem('NameProduct');
			this.Product = json ? JSON.parse(json) : [];
		},

		// xoa sp ra gio hang
		removeProduct(id) {
			let productIndex = this.Product.findIndex(item => item.id == id);
			this.Product.splice(productIndex, 1);
			this.saveLocalStore();
		}
	};
	$scope.cart.loadFormLocalStorage();
});