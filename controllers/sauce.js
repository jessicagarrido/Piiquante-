const Sauce = require("../models/Sauce");
const fs = require("fs");

//Afficher les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// Afficher une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Non authorisé" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Objet modifié!" }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Non authorisé" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce supprimée !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Liker ou disliker une sauce
exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const sauceId = req.params.id;
  const likeState = req.body.like;

  switch (likeState) {
    case 1:
      Sauce.updateOne(
        { _id: sauceId },
        { $inc: { likes: 1 }, $push: { usersLiked: userId } }
      )
        .then(() => res.status(200).json({ message: "Vous aimez cette sauce!" }))
        .catch((error) => res.status(400).json({ error }));
      break;

    case 0:
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Vous avez retiré votre like !" })
              )
              .catch((error) => res.status(400).json({ error }));
          } else if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } }
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Vous avez retiré votre dislike !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    case -1:
      Sauce.updateOne(
        { _id: sauceId },
        { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } }
      )
        .then(() =>
          res.status(200).json({ message: "Vous n'aimez pas cette sauce!" })
        )
        .catch((error) => res.status(400).json({ error }));
      break;
  }
};
