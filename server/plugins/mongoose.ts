// import mongoose from "mongoose";

// export default defineNitroPlugin(async (_nitroApp) => {
//   const config = useRuntimeConfig();

//   // console.log('🔍 =================================');
//   // console.log('🔍 DEBUG MONGODB CONNECTION');
//   // console.log('🔍 config.mongodbURI:', config.mongodbURI);
//   // console.log('🔍 Type:', typeof config.mongodbURI);
//   // console.log('🔍 =================================');

//   const uri = config.mongodbURI || process.env.MONGODB_URI || 'mongodb://mongo:27017/appdb';
//   // console.log('🔌 URI utilisée:', uri);

//   try {
//     await mongoose.connect(uri);
//     console.log("✅ Connected to MongoDB");
//   } catch (e) {
//     console.error("❌ Erreur Mongo:", e);
//     throw e; // important: si Mongo est indispensable, mieux vaut faire échouer le boot
//   }
// });

