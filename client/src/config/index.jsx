
export const registerFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'Enter your user nama',
        componentType: 'input',
        type: 'text',
    },

    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your user email',
        componentType: 'input',
        type: 'email',
    },

    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your user password',
        componentType: 'input',
        type: 'password',
    },

    {
        name: 'confPassword',
        label: 'Confirm Password',
        placeholder: 'Enter your confirm password',
        componentType: 'input',
        type: 'password',
    }
]

export const loginFormControls = [

    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your user email',
        componentType: 'input',
        type: 'email',
    },

    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your user password',
        componentType: 'input',
        type: 'password',
    }
]

export const addProductFormElements = [
    {
        label : "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title"

    },
    {
        label : "Description",
        name: "description",
        componentType: "textarea",
        type: "text",
        placeholder: "Enter product description"
    },

    {
        label : "category",
        name: "category",
        componentType: "select",
        options: [
            {
                id: "men",
                label: "Men"
            },
            {
                id: "women",
                label: "Women"
            },
            {
                id: "kids",
                label: "Kids"
            },
            {
                id: "accessories",
                label: "Accessories"
            },
            {
                id: "footwear",
                label: "Footwear"
            }
        ]
    },

    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            {
                id: "adidas",
                label: "Adidas"
            },
            {
                id: "nike",
                label: "Nike"
            },
            {
                id: "puma",
                label: "Puma"
            },
            {
                id: "levi",
                label: "Levi"
            },
            {
                id: "zebra",
                label: "Zebra"
            },
            {
                id: "h&m",
                label: "H&M"
            },
        ]
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price"
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter product sale price"
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter product total stock"
    }
]


export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home',
    },

    {
        id: 'men',
        label: 'Men',
        path: '/shop/listing',
    },
    {
        id: 'woman',
        label: 'Woman',
        path: '/shop/listing',
    },
    {
        id: 'kids',
        label: 'Kids',
        path: '/shop/home',
    },
    {
        id: 'footwear',
        label: 'footwear',
        path: '/shop/listing',
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shop/listing',
    }
]


export const sortOptions = [
    {
        id: 'price-lowtohigh',
        label: 'Price: Low to High',
    },
    {
        id: 'price-hightolow',
        label: 'Price: High to Low',
    },
    {
        id: 'title-atoz',
        label: 'Title: A to Z',
    },
    {
        id: 'title-ztoa',
        label: 'Title: Z to A',
    },
]

export const filterOptions = {
    brand: [
        {
            id: 'adidas',
            label: 'Adidas',
        },
        {
            id: 'nike',
            label: 'Nike',
        },
        {
            id: 'puma',
            label: 'Puma',
        },
        {
            id: 'levi',
            label: 'Levi',
        },
        {
            id: 'zebra',
            label: 'Zebra',
        },
        {
            id: 'h&m',
            label: 'H&M',
        },
    ],

    category: [
        {
            id: 'men',
            label: 'Men',
        },
        {
            id: 'women',
            label: 'Women',
        },
        {
            id: 'kids',
            label: 'Kids',
        },
        {
            id: 'accessories',
            label: 'Accessories',
        },
        {
            id: 'footwear',
            label: 'Footwear',
        }
    ]
}

