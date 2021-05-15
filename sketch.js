//Create variables here
var dog,dogImg,happyImg,database,foodS,foodStock
var fedTime,lastFed,feed,addFood;
var milk
function preload()
{
	//load images here
dogImg=loadImage("images/dogImg.png")
happyImg=loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(1000, 400);
  
database=firebase.database()
foodStock=database.ref("food")
foodStock.on("value",readStock)
foodStock.set(20)

milk=new Food();


dog=createSprite(800,200,150,150)
dog.addImage(dogImg)
dog.scale=0.2
feed=createButton("FEED THE DOG")
feed.position(700,95)
feed.mousePressed(feed)

addFood=createButton("ADD FOOD")
addFood.position(800,95)
addFood.mousePressed(addFood)

}


function draw() {  
background("green")

milk.display()

fedTime.on(value,function(data){
lastFed=data.val()
})


  textSize(20)
  fill(255)
 
if(lastFed == 0){
 text(" LAST FEED : 12 AM" ,350,30)
}
else
if(lastFed == 12){
 text("Last Feed :  "+ lastFed%12+"PM",350,30)
}
else{
text("LAST FEED :"+lastFed+"AM",350,30)
}


drawSprites();

}



function feedStock(){
 
  dog.addImage(happyImg)

  milk.updateFoodStock(milk.getFoodStock()-1)
database.ref("/").update({
food:milk.getFoodStock(),
feedTime:hour()
})
}

function readStock(data){
foodS=data.val()
milk.updateFoodStock(foodS)
}

function addFood(){
  foodS++
  database.ref("/").update({
    food:foodS
  })
}