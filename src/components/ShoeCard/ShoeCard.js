import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const FlagItem = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;

  padding: 8px;
  line-height: 1rem;
  color: ${COLORS.white};
  background-color: ${(props) => props.color};
  border-radius: 2px;
`;

const Flag = ({ variant }) => {
  if (!variant || variant === "default") {
    return null;
  }
  const text = (() => {
    switch (variant) {
      case "on-sale":
        return "Sale";
      case "new-release":
      default:
        return "Just Released!";
    }
  })();

  const color = () => {
    switch (variant) {
      case "on-sale":
        return COLORS.primary;
      case "new-release":
      default:
        return COLORS.secondary;
    }
  };

  return <FlagItem color={color}>{text}</FlagItem>;
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const isOnSale = typeof salePrice === 'number';
  const variant = isOnSale
    ? "on-sale"
    : isNewShoe(releaseDate)
    ? "new-release"
    : "default";

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={isOnSale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {isOnSale ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
        <Flag variant={variant} />
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  flex: 1 1 320px;
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(props) => (props.onSale ? "line-through" : "initial")};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
