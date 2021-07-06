import React, { useContext, useEffect, useState } from "react";
import { APIPedidos, IMG_URL } from "../../api/api";
import useAuth from "../../auth/useAuth";
import { CartContext } from "../../layouts/Layout";
import { Alert, Container } from "react-bootstrap";
import styles from "./CartPage.module.css";
import { validateEmail } from "../../components/Validations";

const CartPage = () => {
  const {
    cart,
    setCart,
    addedProduct,
    setAddedProduct,
    cartTotal,
    cartRef,
    setCartTotal,
    clearCartInputs,
  } = useContext(CartContext);

  const { user } = useAuth();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [userForm, setUserForm] = useState({
    nombre: user?.first_name ?? "",
    apellido: user?.last_name ?? "",
    telefono: user?.phone ?? "",
    email: user?.email ?? "",
    direccion: "",
    codigoPostal: "",
  });

  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [alertVariant, setAlertVariant] = useState();

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAlert = (msg, variant) => {
    setAlert(true);
    setAlertMsg(msg);
    setAlertVariant(variant);
    setTimeout(() => {
      setAlert(false);
      setAlertMsg("");
      setAlertVariant("");
    }, 2000);
  };

  const arrayMove = (arr, fromIndex, toIndex) => {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  };

  const addProduct = (product, oldIndex) => {
    setHasLoaded(false);
    const filteredProduct = cartRef.current.filter(
      (item) => item.product_id === product.product_id
    );

    filteredProduct[0].totalNum += 1;

    const filteredProducts = getArrayItems(product);

    setObjectValues(filteredProducts, filteredProduct, oldIndex);

    setCart(cart + 1);
    setCartTotal(cartTotal + product.price);

    setHasLoaded(true);
  };

  const setObjectValues = (filteredProducts, filteredProduct, oldIndex) => {
    Array.prototype.push.apply(filteredProducts, filteredProduct);

    const newIndex = filteredProducts.length - 1;

    arrayMove(filteredProducts, newIndex, oldIndex);

    cartRef.current = filteredProducts;
    setAddedProduct(filteredProducts);
  };

  const getArrayItems = (product) => {
    const filteredProducts = cartRef.current.filter(
      (item) => item.product_id !== product.product_id
    );

    return filteredProducts;
  };

  const deleteProduct = (product, oldIndex) => {
    setHasLoaded(false);
    const filteredProduct = cartRef.current.filter(
      (item) => item.product_id === product.product_id
    );

    if (filteredProduct[0].totalNum > 0) {
      filteredProduct[0].totalNum -= 1;

      const filteredProducts = getArrayItems(product);

      setObjectValues(filteredProducts, filteredProduct, oldIndex);

      setCart(cart - 1);
      setCartTotal(cartTotal - product.price);

      setHasLoaded(true);
    }

    if (filteredProduct[0].totalNum <= 0) {
      cartRef.current.splice(oldIndex, 1);
      setHasLoaded(true);
    }
  };

  const clearInputs = () => {
    setUserForm({
      nombre: user?.first_name ?? "",
      apellido: user?.last_name ?? "",
      telefono: user?.phone ?? "",
      email: user?.email ?? "",
      direccion: "",
      codigoPostal: "",
    });
    setAddedProduct([]);
    cartRef.current = addedProduct;
    setCart(0);
    setCartTotal(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validate = 0;
    Object.entries(userForm).forEach(([key, value]) => {
      if (value === "" || value.trim() === "") {
        handleAlert("No puedes dejar espacios en blanco", "danger");
        validate = 1;
        return;
      }

      if (key === "telefono") {
        if (isNaN(userForm["telefono"]) || userForm["telefono"].length !== 10) {
          handleAlert(
            "El teléfono está incorrecto, debe ser un número de 10 caracteres",
            "danger"
          );
          validate = 1;
          return;
        }
      }

      if (key === "codigoPostal") {
        if (
          isNaN(
            userForm["codigoPostal"] || userForm["codigoPostal"].length !== 5
          )
        ) {
          handleAlert(
            "Código postal incorrecto, deber ser un número de 5 caracteres",
            "danger"
          );
          validate = 1;
          return;
        }
      }

      if (key === "email") {
        if (!validateEmail(userForm["email"])) {
          handleAlert("El formato del email no es correcto", "danger");
          validate = 1;
          return;
        }
      }
    });

    if (validate === 0) {
      const data = { ...userForm, Pedidos: cartRef.current, Total: cartTotal };
      const res = await APIPedidos.createPedido({
        data,
      });
      if (res[1].status === 400) {
        handleAlert(res[0]["message"], "danger");
      } else {
        clearCartInputs();
        handleAlert(res[0]["Response"], "success");
      }
    }
  };

  useEffect(() => {
    addedProduct.forEach((value) => {
      const productId = value.product_id;
      let totalNum = 0;

      addedProduct.forEach((actualProduct) => {
        if (actualProduct.product_id === productId) {
          if (actualProduct.hasOwnProperty("totalNum")) {
            totalNum = actualProduct.totalNum;
          } else {
            totalNum += 1;
          }
        }
      });
      value.totalNum = totalNum;
    });

    const unique = [
      ...new Map(
        addedProduct.map((item) => [item["product_id"], item])
      ).values(),
    ];

    cartRef.current = unique;

    setHasLoaded(true);
  }, [addedProduct, cartRef]);

  return (
    <Container className={styles.cartContainer}>
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-5"
          src="https://image.flaticon.com/icons/png/512/3594/3594363.png"
          alt=""
          width="72"
          height="72"
        />
        <h2>Carrito de Compras</h2>
        <p className="lead">
          Para proceder con su compra verifique sus datos y complete los campos
          vacios. Recibirá un correo cuando su pedido haya sido aprobado.
        </p>
      </div>

      <div className="row">
        {alert ? (
          <Alert variant={alertVariant} className="w-100 mx-auto">
            {alertMsg}
          </Alert>
        ) : null}
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Carrito</span>
            <span className="badge badge-secondary badge-pill">{cart}</span>
          </h4>
          <ul className="list-group mb-3">
            {hasLoaded
              ? cartRef.current.map((product) => {
                  return (
                    <li
                      key={product.product_id}
                      className="list-group-item d-flex justify-content-between align-items-center flex-wrap lh-condensed"
                    >
                      <div className={styles.productCont}>
                        <div className={styles.productInfo}>
                          <h6 className="my-0">{product.name}</h6>
                          <small className="text-muted">
                            {product.descripcion}
                          </small>
                        </div>
                        <div className={styles.imgCont}>
                          <img src={`${IMG_URL}${product.img}`} alt="" />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="text-muted">
                          ${product.totalNum * product.price}
                        </span>
                        <span>Cantidad: {product.totalNum}</span>
                        <div className={styles.buttons}>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              addProduct(
                                product,
                                cartRef.current.indexOf(product)
                              )
                            }
                          >
                            +
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              deleteProduct(
                                product,
                                cartRef.current.indexOf(product)
                              )
                            }
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })
              : null}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>{`$${cartTotal}`}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Datos del Usuario</h4>
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  placeholder=""
                  value={userForm.nombre}
                  onChange={handleChange}
                  disabled={userForm.email ? true : false}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label for="apellido">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  placeholder=""
                  value={userForm.apellido}
                  onChange={handleChange}
                  disabled={userForm.email ? true : false}
                />
              </div>
            </div>

            <div className="mb-3">
              <label for="telefono">Teléfono</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  placeholder="Ejemplo: 4433609253"
                  value={userForm.telefono}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="usuario@ejemplo.com"
                value={userForm.email}
                onChange={handleChange}
                disabled={userForm.email ? true : false}
              />
            </div>

            <div className="mb-3">
              <label for="direccion">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                placeholder="Dirección"
                value={userForm.direccion}
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <label for="codigoPostal">Código Postal</label>
              <input
                type="text"
                class="form-control"
                id="codigoPostal"
                name="codigoPostal"
                placeholder="Código Postal"
                value={userForm.codigoPostal}
                onChange={handleChange}
              />
            </div>
            <hr class="mb-4" />
            <button
              class="btn btn-primary btn-lg btn-block"
              onClick={handleSubmit}
            >
              Realizar Pedido
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
