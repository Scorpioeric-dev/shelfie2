update products set name = $2,
price = $3,
image_url = $4
where product_id = $1;


select * from products;