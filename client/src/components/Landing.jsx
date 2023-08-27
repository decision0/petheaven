import main from "../assets/images/main1.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";
import styled from "styled-components";
const Landing = () => {
  return (
    <StyledWrapper>
      <div className="container page">
        {/* info */}
        <div className="info">
          <div
            style={{
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
              marginLeft: "27.7rem",
              marginTop: "5rem",
              height: 150,
              width: 150,
            }}
          >
            <Logo />
          </div>

          <br />
          <br />
          <h1>
            Pet <span>Heaven</span>
          </h1>
          <p>
            <span>Our Purpose: </span>
            At Pet Heaven, we provide a haven for abandoned pets, ensuring their
            well-being and happiness. We strive to match these loving animals
            with caring homes, fostering compassion and friendship between pets
            and people.
          </p>
          <p>
            <span>Our Facilities: </span>
            We offers a state-of-the-art sanctuary designed to cater to the
            diverse needs of our furry inhabitants. From spacious play areas to
            cozy resting nooks, we've created an environment that mirrors a true
            home. Our committed staff and volunteers ensure round-the-clock
            care, medical attention, and emotional support for every pet.
          </p>
          <p>
            <span>Our Pets: </span>
            We specializes in rescuing and caring for both cats and dogs. Each
            pet comes with a unique story, a testament to their resilience and
            capacity to love. From mischievous kittens to wise old dogs, we have
            a delightful variety of personalities waiting to find their forever
            homes. Our goal is to bridge the gap between abandoned pets and
            loving families, creating lifelong bonds filled with joy and
            companionship.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
    text-align: justify;
  }
  .register-link {
    margin-right: 1rem;
  }

  p span {
    color: var(--primary-200);
    font-weight: 700;
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
