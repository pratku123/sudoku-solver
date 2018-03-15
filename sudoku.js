var _sudoku = _sudoku || {
	ready : function(){
		_sudoku.create_grid();
				var app = angular.module('StarterApp', ['ngMaterial']);
		var row,col;
		app.controller('AppCtrl1', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
			$scope.toggleSidenav = function(menuId) {
				$mdSidenav(menuId).toggle();
			};
			$scope.solve = function(){
				var str="";
				var grid=[[$scope.c11,$scope.c12,$scope.c13,$scope.c14,$scope.c15,$scope.c16,$scope.c17,$scope.c18,$scope.c19],
					  [$scope.c21,$scope.c22,$scope.c23,$scope.c24,$scope.c25,$scope.c26,$scope.c27,$scope.c28,$scope.c29],
					  [$scope.c31,$scope.c32,$scope.c33,$scope.c34,$scope.c35,$scope.c36,$scope.c37,$scope.c38,$scope.c39],
					  [$scope.c41,$scope.c42,$scope.c43,$scope.c44,$scope.c45,$scope.c46,$scope.c47,$scope.c48,$scope.c49],
					  [$scope.c51,$scope.c52,$scope.c53,$scope.c54,$scope.c55,$scope.c56,$scope.c57,$scope.c58,$scope.c59],
					  [$scope.c61,$scope.c62,$scope.c63,$scope.c64,$scope.c65,$scope.c66,$scope.c67,$scope.c68,$scope.c69],
					  [$scope.c71,$scope.c72,$scope.c73,$scope.c74,$scope.c75,$scope.c76,$scope.c77,$scope.c78,$scope.c79],
					  [$scope.c81,$scope.c82,$scope.c83,$scope.c84,$scope.c85,$scope.c86,$scope.c87,$scope.c88,$scope.c89],
					  [$scope.c91,$scope.c92,$scope.c93,$scope.c94,$scope.c95,$scope.c96,$scope.c97,$scope.c98,$scope.c99]]; 
				for(var i=1;i<=9;i++)
				{
					for(var j=1;j<=9;j++)
					{
					  var str2='c'+i+j;
						grid[i-1][j-1]=document.getElementById(str2).value;
					}			   
				} 
				var f2=_sudoku.check(grid);
				if(f2==true)
				{
					if(_sudoku.solve1(grid)==true)
					{
						for(var i=1;i<=9;i++)
						{
							for(var j=1;j<=9;j++)
							{
								var str2='c'+i+j;
								document.getElementById(str2).value=grid[i-1][j-1];	
							}   
						} 
						document.getElementById('error').innerHTML='<div class="alert alert-success"><strong>Success!</strong> Solved Successfully</div>';			 
					}
					else 
					{
						document.getElementById('error').innerHTML='<div class="alert alert-warning"><strong>Warning!</strong> No solution</div>';	   //message No solution
					}
				}
				else
				{
					document.getElementById('error').innerHTML='<div class="alert alert-warning"><strong>Warning!</strong> Enter a valid Sudoku</div>'; 
				}
			};
			$scope.reset=function(){
				document.getElementById('error').innerHTML='<div class="alert alert-info"><strong>Info!</strong> Enter the initial Sudoku</div>';
				for(var i=1;i<=9;i++)
				{
					for(var j=1;j<=9;j++)
					{
						var str2='c'+i+j;
						document.getElementById(str2).value="";		
					}
				}
			};
		}]).config( function($mdThemingProvider){
			$mdThemingProvider.theme('docs-dark', 'default')
				.primaryPalette('yellow')
				.dark();
		});
	},
	create_grid : function() {
		var str='';
		for(var i=1;i<=9;i++)
		{
			str+='<md-content layout="row" layout-sm="column">';
			for(var j=1;j<=9;j++)
			{
				if(i%3==0)
				{
					if(j==3||j==6)
					{
						str+='<input id="c'+i+j+'" type="text" class="form-control" ng-model="c'+i+j+'" style="margin-right:5px;margin-bottom:5px;">';
					}
					else
					{
						str+='<input id="c'+i+j+'" type="text" class="form-control" ng-model="c'+i+j+'" style="margin-bottom:5px;">';
					}
				}
				else
				{
					if(j==3||j==6)
					{
						str+='<input id="c'+i+j+'" type="text" class="form-control" ng-model="c'+i+j+'" style="margin-right:5px;">';
					}
					else
					{
						str+='<input id="c'+i+j+'" type="text" class="form-control" ng-model="c'+i+j+'">';
					}
				}
			}
			str+='</md-content>';
		}
		$('#sudoku').html(str);
	},
	solve1: function(grid) {
		var ro,co;
		if(!_sudoku.find_unassigned_cell(grid))
			return true;
		ro=row;
		co=col;
		for(var i=1;i<=9;i++)
		{//document.write("Safe");
			if(_sudoku.checksafe(grid,ro,co,i))
			{
				grid[ro][co]=i;
				if(_sudoku.solve1(grid))
					return true;
				grid[ro][co]=0;
			}
		}
		return false;
	},
	check: function(grid) {
    	for(var i=0;i<9;i++)
		{
		    for(var j=0;j<9;j++)
			{
				if(!grid[i][j])
				{ 
					grid[i][j]=0;
				}
				else
				{
					if(!(_sudoku.checknum(grid[i][j])&&_sudoku.checksafe2(grid,i,j)))
						return false;	 
				}
			}
		}
		return true;
	},
	checksafe2: function(grid,r,c) {
		return (!_sudoku.boxcheck2(grid,r-r%3,c-c%3,grid[r][c],r,c))&&(!_sudoku.colcheck2(grid,c,r))&&(!_sudoku.rowcheck2(grid,r,c));
	},
	boxcheck2: function(grid, startr, startc, n, r, c) {
		for(var i=0;i<3;i++)
		{
			for(var j=0;j<3;j++)
			{
				if((grid[i+startr][j+startc]==n)&&((i+startr)!=r)&&((j+startc)!=c))
				{
					return true;
				}
			}
		}
		return false;
	},
	colcheck2: function(grid,c,r){
		for(var j=0;j<9;j++)
		{
			if((grid[j][c]==grid[r][c])&&(j!=r))
				return true;
		}
		return false;
	},
	rowcheck2: function(grid,r,c) {
		for(var i=0;i<9;i++)
		{
			if((grid[r][i]==grid[r][c])&&(i!=c))
				return true;
		
		}
		return false;
	},
	checknum: function(n) {
		if(n>=1&&n<=9)
			return true;
		else
			return false;
	},
	checksafe: function(grid,r,c,num) {
		return (!_sudoku.boxcheck(grid,r-r%3,c-c%3,num))&&(!_sudoku.colcheck(grid,c,num))&&(!_sudoku.rowcheck(grid,r,num));
	},
	boxcheck: function(grid,startr,startc,n) {
		for(var i=0;i<3;i++)
		{
			for(var j=0;j<3;j++)
			{
				if(grid[i+startr][j+startc]==n)
				{
					return true;
				}
			}
		}
		return false;
	},
	colcheck: function(grid,c,n) {
		for(var j=0;j<9;j++)
		{
			if(grid[j][c]==n)
			return true;
		}
		return false;
	},
	rowcheck: function(grid,r,n) {
		for(var i=0;i<9;i++) {
			if(grid[r][i]==n)
			return true;
		}
		return false;
	},
	find_unassigned_cell: function(grid) {
		for(row=0;row<9;row++)
		{
			for(col=0;col<9;col++)
			{
			   if(grid[row][col]==0)
			   return true;
			}
		}
		return false;
	}
}

$(document).ready(function(){
	_sudoku.ready();
});
