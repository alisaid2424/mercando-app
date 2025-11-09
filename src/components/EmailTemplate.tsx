import { DOMAIN } from "@/constants/enums";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type EmailTemplateProps = {
  fullName: string;
  amount: number;
  orderId: string;
};

export const EmailTemplate = ({ body }: { body: EmailTemplateProps }) => (
  <Html>
    <Head />
    <Preview>
      Discover your Mercando order details – Thank you for shopping with us!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://res.cloudinary.com/djhoc0ys4/image/upload/v1762196366/categories_mercando/logo.png.png"
          alt="Mercando Logo"
          width="200"
          height="200"
          style={logo}
        />

        <Text style={paragraph}>Hi {body.fullName},</Text>

        <Text style={paragraph}>
          Thank you for shopping with <strong>Mercando</strong> – your modern
          online marketplace.
        </Text>

        <Text style={paragraph}>
          We’ve successfully received your payment of{" "}
          <strong>${body.amount.toFixed(2)}</strong>.
        </Text>

        <Text style={paragraph}>
          You can view your order details by clicking the button below:
        </Text>

        <Section style={btnContainer}>
          <Button
            style={buttonStyle}
            href={`${DOMAIN}/order-details/${body.orderId}`}
          >
            View Your Order
          </Button>
        </Section>

        <Text style={paragraph}>
          We’re preparing your items for delivery and will notify you once your
          order is on its way.
        </Text>

        <Text style={paragraph}>
          Best regards,
          <br />
          🛒 The Mercando Team
        </Text>

        <Hr style={hr} />

        <Text style={footer}>
          Mercando – offering a seamless shopping experience with curated
          products, fast delivery, and excellent customer service.
          <br />
          Visit our{" "}
          <a href={DOMAIN} style={{ color: "#E9590C" }}>
            website
          </a>{" "}
          for more great finds.
        </Text>
      </Container>
    </Body>
  </Html>
);

// === Styles ===

const main = {
  backgroundColor: "#f9f9f9",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderRadius: "50%",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333",
};

const btnContainer: React.CSSProperties = {
  textAlign: "center",
  marginTop: "20px",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#E9590C",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#eeeeee",
  margin: "30px 0",
};

const footer = {
  color: "#888",
  fontSize: "12px",
  textAlign: "center" as const,
};
