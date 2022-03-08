const { Router } = require("express");
const router = Router();

const form = require("../models/forms");

router.get("/list", async (req, res) => {
  try {
    //change what is returned
    console.log("called");
    const { address } = req.query;
    const formData = await form.find({ "config.team": address });
    console.log(formData);
    // Change fake data to real data
    // const fakeData = [
    //   {
    //     id: "1",
    //     name: "Test Form 1",
    //     responses: 83,
    //     // key value with random picture
    //     image: "https://picsum.photos/200/300",
    //   },
    // ];

    res.json({ success: true, data: formData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, data: err });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { id, name, address } = req.body;
    console.log(address);
    const formData = await new form({
      id: id,
      "config.name": name,
      "config.status": "draft",
      "config.team": address,
    }).save();
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, data: err });
  }
});

router.post("/publish-form", async (req, res) => {
  try {
    const { id, steps } = req.body;
    const formData = await form.findOneAndUpdate(
      { id: id },
      {
        $set: {
          "config.status": "published",
          steps: steps,
        },
      },
      { new: true }
    );
    // const newForm = await new form({
    //   id,
    //   steps,
    //   config,
    // }).save();
    console.log(newForm);
    res.json({ success: true, data: formData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, data: err });
  }
});

// router.post("/:id", auth.protected, async (req, res) => {
//   try {
//     const { id, amount, topic, currency, amountPeople, address } = req.body;
//     const newRequest = await new request({
//       id,
//       amount,
//       topic,
//       currency,
//       amountPeople,
//       address,
//     }).save();
//     await Stats.findOneAndUpdate(
//       {},
//       {
//         $inc: {
//           requestCount: 1,
//         },
//       }
//     );
//     await Stats.findOneAndUpdate({}, { $addToSet: { addressList: address } });

//     res.json({ success: true, data: newRequest });
//   } catch (err) {
//     console.log(err);
//     res.json({ success: false, data: err });
//   }
// });

// router.delete("/delete", auth.protected, async (req, res) => {
//   try {
//     const { _id } = req.body;
//     const deletedRequest = await request.findByIdAndDelete({ _id });
//     const deletedPayment = await payment.deleteMany({ request: _id });
//     res.json({ success: true, data: { deletedRequest, deletedPayment } });
//   } catch (err) {
//     console.log(err);
//     res.json({ success: false, data: err });
//   }
// });

module.exports = router;
