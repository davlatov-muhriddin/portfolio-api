import Joi from "joi";

// network validation
function validateNetwork(networks) {
  const schema = Joi.object({
    icon: Joi.string().required(),
    url: Joi.string().required(),
  });

  return schema.validate(networks);
}

// skills validation

function validateSkills(skills) {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(skills);
}

// project validation

function validateProjects(project) {
  const schema = Joi.object({
    image: Joi.string().required(),
    title: Joi.string().required().min(15).max(100),
    description: Joi.string().required().min(50).max(500),
    github: Joi.string().required(),
    google: Joi.string().required(),
    youtube: Joi.string().required(),
    technology: Joi.array().required(),
  });

  return schema.validate(project);
}

export { validateNetwork, validateSkills, validateProjects };
