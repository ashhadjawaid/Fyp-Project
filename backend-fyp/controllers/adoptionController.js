import {Adoption} from"../models/Adoption.js";

export const getAll = async (req, res) => {
  try {
    const adoptions = await Adoption.find();

    res.json(adoptions);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const postAdoption = (async (req, res) => {
  const {
    petName,
    petBio,
    petBreed,
    age,
    status,
    weight,
    height,
    hypoallegenic,
    city,
    address,
    adoptionPicture,
  } = req.body;

  if (!petName || !petBio || !petBreed || !age || !city || !status || !weight || !height || !city || !hypoallegenic || !address || !adoptionPicture ) {
    return next(new ErrorHandler("Please provide full details About Animal.", 400));
  }
  const postedBy = req.user._id;
  const adoption = await Adoption.create({
    petName,
    petBio,
    petBreed,
    age,
    status,
    weight,
    height,
    hypoallegenic,
    city,
    address,
    adoptionPicture,
    status,
  });
  res.status(200).json({
    success: true,
    message: "Animal added to Adoption Successfully!",
    adoption,
  });
});

export const create = async (req, res) => {
  try {
    const { firstName, lastName, email, address, phone, pet } = req.body;

    const created = await Adoption.create({
      firstName,
      lastName,
      phone,
      email,
      address,
      pet,
    });

    res.json({ message: "Adooptions successfuly created.", created });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, address, phone, pet } = req.body;

    const created = await Adoption.findByIdAndUpdate(id, {
      firstName,
      lastName,
      phone,
      email,
      address,
      pet,
    });

    res.json({ message: "Adooptions successfuly updated.", created });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const deleteAdoption = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Adoption.findByIdAndRemove(id);

    res.json({ message: "Adoption succesfuly delete", deleted });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
