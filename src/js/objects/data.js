module.exports = {
	levels: [
		{
			stage: 1,
			level: {
				image: './dist/images/level/1.jpg'
			},
			hero: {
				message: 'Meow!',
				image: './dist/images/hero/cat.png'
			},
			items: [
				{
					type: 'nice cookie',
					points: 5,
					image: './dist/images/items/nice-cookie.png'
				},
				{
					type: 'enemy',
					points: -5,
					image: './dist/images/items/enemy-1.png'
				}
			]
		},
		{
			stage: 2,
			level: {
				image: './dist/images/level/2.jpg'
			},
			hero: {
				message: 'Wuf!',
				image: './dist/images/hero/dog.png'
			},
			items: [
				{
					type: 'nice cookie',
					points: 5,
					image: './dist/images/items/nice-cookie.png'
				},
				{
					type: 'enemy',
					points: -5,
					image: './dist/images/items/enemy-2.png'
				}
			]
		}
	]
};
