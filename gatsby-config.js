require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.danielballoch.com`
  },
  plugins: ["gatsby-plugin-emotion", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap","gsap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/gatsby-icon.png"
    }
  }, {
    resolve: `gatsby-plugin-sharp`,
    options: {
      defaults: {
        formats: [`auto`, `webp`],
        placeholder: `blurred`,
        quality: 100,
      }
    }
  }, "gatsby-transformer-sharp",
   {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};