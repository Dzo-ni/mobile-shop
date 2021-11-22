import React from "react";

function CookiesInformation({ setCookie, getCookie }) {
  const close = (e) => {
    if (e.target.classList.contains("btn-primary")) {
      var cookie_info_box = e.target.parentElement.parentElement;
    } else {
      var cookie_info_box = e.target.parentElement;
    }
    if (!getCookie("information")) {
      setCookie("information", 1, 30);
    }

    cookie_info_box.classList.add("hide_cookie_information");
    setTimeout(() => {
      cookie_info_box.style.display = "none";
    }, 1500);
  };
  return (
    <div id="cookie_policy">
      <h2>Cookie policy and privacy</h2>
      <p>
        Mobile Shop DOO use cookie to offer better user expirence We used our
        cookie and third party cookie
      </p>
      <p>
        We used google analytics to improve UI AND UX for user and to improve
        bussiness plan with analytics and statistics
        <button onClick={close} type="button" class="btn btn-primary px-3 mx-4">
          OK
        </button>
      </p>
      <button
        onClick={close}
        type="button"
        class="btn-close btn-close-white "
        aria-label="Close"
      ></button>
    </div>
  );
}

export default CookiesInformation;
