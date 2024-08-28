
import { UserModel } from "../../../../DB/model/user.js";
// export const AddToBag = async (req, res) => {

//   const { basicId, itemId, id } = req.params;
//   try {
//     console.log(basicId, itemId);
//     const bagItem = await bagModel.findOne({ itemId, madeby: id });
//     if (bagItem) {
//       const updateBagItem = await bagModel.findOneAndUpdate(
//         { itemId },
//         { $inc: { quatity: 1 } },
//         { new: true }
//       );
//       return res.status(200).json({ message: "Quantity increased successfully", updateBagItem });
//     }

//     const findBasic = await basic.findById(basicId);
//     if (!findBasic) {
//       return res.status(400).json({ message: "مش موجود" });
//     }

//     const findItem = findBasic.Subcategories.find(item => item._id.toString() === itemId);
//     if (!findItem) {
//       return res.status(404).json({ message: "item not found" });
//     }

//     const newBagItem = {
//       classification: [{ description: findItem.description, image: findItem.image }],
//       quatity: 1,
//       price: findItem.price,
//       basicId: basicId,
//       itemId: itemId,
//       madeby: req.user._id,
//     };

//     const createdBagItem = await bagModel.create(newBagItem);
//     if (!createdBagItem) {
//       return res.status(400).json({ message: "Error adding item to the bag" });
//     }

//     return res.status(200).json({ message: "Item added to the bag successfully", createdBagItem });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: `Error: ${error}` });
//   }
// };

// Add items to user cart
export const AddToBag = async (req, res) => {
  try {
    console.log('adddToBag')
    const { itemId } = req.body;
    console.log('req.user._id', req.user._id)
    const userData = await UserModel.findOne({ _id: req.user._id });
    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await UserModel.findByIdAndUpdate(req.user._id, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};


// Remove an item completely from the user's cart
export const deleteItemFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    let userData = await UserModel.findOne({ _id: req.user._id });

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      delete cartData[itemId];
    } else {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    await UserModel.findByIdAndUpdate(req.user._id, { cartData });
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error removing item from cart' });
  }
};



export const addToCartFromLocalstorage = async (req, res) => {
  try {


    const { cartData } = req.body;
    console.log('ssssssss')
    let userData = await UserModel.findOne({ _id: req.user._id });


    if (!userData) {
      return res.json({ success: false, message: 'يجب تسجيل الدخول' });
    }

    // Merge local storage cart data with existing cart data
    let existingCartData = userData.cartData || {};
    for (let itemId in cartData) {
      existingCartData[itemId] = cartData[itemId];
    }
    console.log(existingCartData)

    await UserModel.findByIdAndUpdate(req.user._id, { cartData: existingCartData });
    res.json({ success: true, message: "Cart updated from local storage" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove items from user cart
export const deletFrombag = async (req, res) => {
  try {
    const { itemId } = req.body;
    let userData = await UserModel.findOne({ _id: req.user._id });
    let cartData = userData.cartData || {};
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await UserModel.findByIdAndUpdate(req.user._id, { cartData });
    res.json({ success: true, message: 'Removed success' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// export const deletFrombag = async (req, res) => {
//   const { itemId, id } = req.params
//   const findbag = await bagModel.findOneAndDelete({ itemId: itemId }, { madeby: id })
//   if (!findbag) {
//     res.status(400).json({ message: "error not found" })
//   } else {

//     console.log('goood')
//     res.status(200).json({ message: "delet sucsses", findbag })
//   }
// }


// Get user cart data
export const getCart = async (req, res) => {
  try {
    let userData = await UserModel.findOne({ _id: req.user._id });
    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// export const showAll = async (req, res) => {
//   try {
//     const { madeby } = req.params;
//     console.log(madeby)
//     const findBag = await bagModel.find({ madeby });

//     if (!findBag || findBag.length === 0) {
//       res.status(400).json({ message: "مش موجود" });
//     } else {
//       console.log(findBag)
//       res.status(200).json({ message: "sucsses", findBag });
//     }
//   } catch (error) {
//     res.status(500).json({ message: `catch error ${error}` });
//   }
// };
// export const decreaseRequestTimes = async (req, res) => {
//   const { itemId, id } = req.params;
//   try {
//     console.log(itemId, id);

//     const bagItem = await bagModel.findOne({ itemId, madeby: id });

//     if (!bagItem) {
//       console.log('not found');
//       return res.status(400).json({ message: "Item not found in the bag" });
//     }
//     console.log(' found')
//     bagItem.quatity--;

//     if (bagItem.quatity === 0) {
//       console.log('quantity is zero');
//       await bagModel.deleteOne({ itemId, madeBy: id });
//       return res.status(200).json({ message: "Item removed from cart successfully" });
//     }


//     await bagItem.save();


//     res.status(200).json({ message: "Request times decreased successfully", bagItem });
//   } catch (error) {

//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// export const Total = async (req, res) => {
//   const { id } = req.params;
//   const find = await bagModel.find({ madeby: id });
//   if (find.length === 0) {
//     return res.json({ message: 'Cart is empty' });
//   }
//   else {
//     let totalPrice = 0;
//     for (const item of find) {
//       totalPrice += item.quatity * item.price;
//     }

//     res.status(200).json({ totalPrice });
//   }
// }

// export const getUserCart = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const find = await bagModel.find({ madeby: id });
//     if (!find) {
//       res.status(400).json({ message: 'Cart not found for this user' });
//     } else {
//       res.status(200).json(find);
//     }
//   } catch (error) {
//     res.status(500).json({ message: `Error: ${error}` });
//   }
// }



