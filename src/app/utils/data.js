//пример инфы для создания пейджей
export const data = {
    products: [
        // {
        //   +  "id": "number",
        //   +  "productName": "string",
        //   +  "amount": "number", //количество в единицах измерения, например 5 кг
        //   +  "unitOfMeasure": "string", //название единиц измерения в которых поставляется, надо подумать о надстрочных и подстрочных символах, мб добавить кастомный тег для хранения в базе или в span со стилями
        //   +  "manufacturer": "string", //производитель    
        //   +  "productType": "string",
        //   +  "isMainItem": "boolean", //нужно ли выводить элемент на главной странице
        //   +  "description": "text",
        //   +  "imageURL": "string", //ссылка на изображение в storage supabase
        //     "otherAttributes": [
        //         {
        //             "name": "string",
        //             "value": "string"
        //         }
        //     ]
        // },
        {
            id: 1,
            productType: 'Шпатлевка',
            productName: 'Шпатлевка BCRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'BCRYL-PUTZ',
            description: 'Описание продукта 1',
            isMainItem: true,
            price: 9.66,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 0,
            unitOfMeasure: 'кг',
            "otherAttributes": [
                {
                    "name": "string",
                    "value": "string"
                }
            ]
        },
        {
            id: 2,
            productType: 'Апатлевка',
            productName: 'Апатлевка ACRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'ACRYL-PUTZ',
            description: 'Описание продукта 2',
            isMainItem: false,
            price: 300,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 10,
            unitOfMeasure: 'кг',
            "otherAttributes": [
                {
                    "name": "string",
                    "value": "string"
                }
            ]
        },
        {
            id: 3,
            productType: 'Шпатлевка',
            productName: 'Шпатлевка BCRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'BCRYL-PUTZ',
            description: 'Описание продукта 1',
            isMainItem: false,
            price: 9.66,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 1,
            unitOfMeasure: 'кг',
            "otherAttributes": [
                {
                    "name": "string",
                    "value": "string"
                }
            ]
        },
    ],
};