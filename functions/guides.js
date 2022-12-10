exports.handler = async (e, context) => {
  const guides = [
    { title: "Beat all Zelda Bosses Like a Boss", author: "mario" },
    { title: "Mario Kart Shortcuts You Never Knew Existed", author: "luigi" },
    { title: "Ultimate Street Fighter Guide", author: "chun-li" },
  ];

  //this property(clientContext) provided by netlify, contains information about the person making the request, identifies if there's an user
  if (context.clientContext.user) {
    return { //success
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  }else {
    return {
        statusCode: 401, //unauthenticated
        body: JSON.stringify({msg: "You must be logged in to view this content."})
    }
  }
};
