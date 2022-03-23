module.exports = {
    siteMetadata: {
        title: "My first website",
    },
    plugins: [
        //"gatsby-plugin-image",
        //"gatsby-plugin-sharp",
        {// this is the pokimon API 
            resolve: `gatsby-source-wordpress`,
            options: {
                baseUrl: `https://csc496wordpress.tldr.dev/graphql`,
                protocol: `https`,
                hostingWPCOM: false,
                useACF: false
            },//for images
            //resolve: `gatsby-source-filesystem`,
            //options: {
                //name: `blog`,
                //path: `${__dirname}/blog/`,
            //},
        },
        "gatsby-plugin-mdx",
    ],
};

