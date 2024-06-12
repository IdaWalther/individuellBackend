import promotionsDB from "../controllers/promotionController.js";

// Promotion 3 för 2
const thirdItemFree = async (cart, menu) => {
    try {
        if (cart.length >= 3) {
            cart[2].price = 0;
        } else {
            let freeItem = cart.findIndex(item => item.price === 0);
            if (freeItem !== -1) {
                const beforePromotion = await menu.findOne({ title: cart[freeItem].title })
                cart[freeItem].price = beforePromotion.price;
            }
        }
        return cart
        
    } catch (error) {
        console.log(error);
    }
}

// Kampanjpris på två produkter som man som admin kan lägga till i databasen.
const campaingPrice = async (cart, menu) => {
    try {
        const promotion = await promotionsDB.findOne({ id: 'betterPrice' });
        const products = promotion.products;
        const discount = promotion.discount;
        const firstItem = products[0].title;
        const secondItem = products[1].title;
        const firstItemIndex = cart.findIndex(item => item.title === firstItem);
        const secondItemIndex = cart.findIndex(item => item.title === secondItem);
        const beforePromotion1 = await menu.findOne({ title: firstItem });
        const beforePromotion2 = await menu.findOne({ title: secondItem });

        if (firstItemIndex !== -1 && secondItemIndex !== -1) {
            if (!cart[firstItemIndex].promotionApplied && !cart[secondItemIndex].promotionApplied) {
            cart[firstItemIndex].price -= discount / 2;
            cart[secondItemIndex].price -= discount / 2;
            cart[firstItemIndex].promotionApplied = true;
            cart[secondItemIndex].promotionApplied = true;
            } 
        } else {
            if (firstItemIndex !== -1) {
                cart[firstItemIndex].price = beforePromotion1.price;
                cart[firstItemIndex].promotionApplied = false;
            }
            if (secondItemIndex !== -1) {
                cart[secondItemIndex].price = beforePromotion2.price;
                cart[secondItemIndex].promotionApplied = false;
            }
        }
        return cart;
    } catch (error) {
        console.log(error);
    }
}

// Gratis frakt om du är inloggad.
export const freeUserShipping = (shipping) => {
    if (global.currentUser) {
        shipping = 0
    }
    return shipping
}

// Våga vägra pengar.
const goBankrupt = (cart, shipping) => {
    cart.forEach(item => {
        item.price = 0
    });
    shipping = 0;
    return { cart, shipping }
}


// Knyter en funktion till respektive promotions id i databasen {promotion.id : funktionsNamn}
const promotions = {
    threeForTwo: thirdItemFree,
    freeShipping: freeUserShipping,
    liquidate: goBankrupt,
    betterPrice: campaingPrice
}

export const runPromotions = async (cart, menu, shipping) => {
    // Hämtar alla aktiva promotions från databasen.
    const activePromotions = await promotionsDB.find({ active: true });
    
    try {
        // "for of" loop istället för forEach då "for of" hanterar async bättre. (tydligen)
        // forEach väntar inte på att en async funktion har kört klart förens den startar nästa varv. Det gör "for of".
        for (const promotion of activePromotions) {
            const functionToRun = promotions[promotion.id];
            if (functionToRun) {
                if (promotion.id === 'freeShipping') {
                    shipping = functionToRun(shipping);
                } else if (promotion.id === 'liquidate') {
                    const result = functionToRun(cart, shipping);
                    shipping = result.shipping;
                    cart = result.cart;
                } else {
                    await functionToRun(cart, menu);
                }
            } else {
                const error = new Error(`Kan inte hitta en kampanj för ${promotion.id}`);
                error.status = 404;
                throw error;
            }
        }
        return { cart, shipping };
    } catch (error) {
        console.log(error);
    }
};