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
            ],
        },
        {
            id: 2,
            productType: 'Апатлевка',
            productName: 'Апатлевка ACRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'ACRYL-PUTZ',
            description: 'Описание продукта 2',
            isMainItem: false,
            price: 400,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 10,
            unitOfMeasure: 'кг',
            "otherAttributes": [
                {
                    "name": "Параметр 1",
                    "value": "Значение 1",
                },
                {
                    "name": "Параметр 2",
                    "value": "Значение 2"
                }
            ],
        },
        {
            id: 3,
            productType: 'Шпатлевка',
            productName: 'Шпатлевка BCRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'BCRYL-PUTZ',
            description: 'Описание продукта 3',
            isMainItem: false,
            price: 9.63,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 1,
            unitOfMeasure: 'кг',
            otherAttributes: [
                {
                    "name": "Параметр 1",
                    "value": "Значение 1"
                }
            ],
        },
        {
            id: 4,
            productType: 'Шпатлевка',
            productName: 'Шпатлевка BCRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'BCRYL-PUTZ',
            description: 'Описание продукта 4',
            isMainItem: false,
            price: 9.64,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 1,
            unitOfMeasure: 'кг',
            otherAttributes: [
                {
                    "name": "Параметр 1",
                    "value": "Значение 1"
                }
            ],
        },
        {
            id: 5,
            productType: 'Шпатлевка',
            productName: 'Шпатлевка BCRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'BCRYL-PUTZ',
            description: 'Описание продукта 5',
            isMainItem: false,
            price: 9.65,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 1,
            unitOfMeasure: 'кг',
            otherAttributes: [
                {
                    "name": "Параметр 1",
                    "value": "Значение 1"
                }
            ],
        },
        {
            id: 6,
            productType: 'Шпатлевка',
            productName: 'Шпатлевка BCRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'BCRYL-PUTZ',
            description: 'Описание продукта 6',
            isMainItem: false,
            price: 9.66,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 1,
            unitOfMeasure: 'кг',
            otherAttributes: [
                {
                    "name": "Параметр 1",
                    "value": "Значение 1"
                }
            ],
        },
        {
            id: 7,
            productType: 'Шпатлевка',
            productName: 'Шпатлевка BCRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'BCRYL-PUTZ',
            description: 'Описание продукта 7',
            isMainItem: false,
            price: 9.67,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 1,
            unitOfMeasure: 'кг',
            otherAttributes: [
                {
                    "name": "Параметр 1",
                    "value": "Значение 1"
                }
            ],
        },
        {
            id: 8,
            productType: 'Шпатлевка',
            productName: 'Шпатлевка BCRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'BCRYL-PUTZ',
            description: 'Описание продукта 8',
            isMainItem: false,
            price: 9.66,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 1,
            unitOfMeasure: 'кг',
            otherAttributes: [
                {
                    "name": "Параметр 1",
                    "value": "Значение 1"
                }
            ],
        },
        {
            id: 9,
            productType: 'Апатлевка',
            productName: 'Апатлевка ACRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
            manufacturer: 'ACRYL-PUTZ',
            description: 'Описание продукта 9',
            isMainItem: false,
            price: 300,
            currency: 'BYN',
            imageURL: "/images/1.jpeg",
            amount: 10,
            unitOfMeasure: 'кг',
            "otherAttributes": [
                {
                    "name": "Параметр 1",
                    "value": "Значение 1",
                },
                {
                    "name": "Параметр 2",
                    "value": "Значение 2"
                }
            ],
        },
        {
            id: 10,
            productType: 'Шпатлевка',
            productName: 'Шпатлевка ACRYL-PUTZ ST10. Старт-финиш. 20 кг. Польша.',
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
                    "name": "Параметр 1",
                    "value": "Значение 1",
                },
                {
                    "name": "Параметр 2",
                    "value": "Значение 2"
                }
            ],
        },
    ],
};