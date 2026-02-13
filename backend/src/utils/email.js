export const sendEmail = async ({ to, subject, html }) => {
  console.log("\n📧 ===== EMAIL SENT =====");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Content:");
  console.log(html);
  console.log("📧 ======================\n");
};
