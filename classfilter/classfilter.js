class Filter {
  constructor(product) {
    this.product = product;
  }

  subCollection(sc) {
    if (sc) {
      this.product = this.product.filter((product) => {
        return product.subCollection === sc;
      });
    }

    return this;
  }

  value(minValue, maxValue) {
    if (minValue && maxValue && minValue !== "0" && maxValue !== "0") {
      this.product = this.product.filter((product) => {
        return (
          product.price >= Number(minValue) && product.price <= Number(maxValue)
        );
      });
    }
    return this;
  }

  size(size) {
    if (size) {
      this.product = this.product.filter((product) => {
        return product.size.some((res) => res === size);
      });
    }
    return this;
  }
}

module.exports = Filter;
