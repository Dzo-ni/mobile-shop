import React, { useState } from "react";
import "./EmailCompose.css";
function EmailCompose() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <div class="container bootdey">
        <div class="email-app">
          <nav>
            <a
              href="#"
              class="btn btn-danger btn-block"
              onClick={() => setPage(2)}
            >
              Compose Email
            </a>
            <ul class="nav">
              <li class="nav-item">
                <a
                  class="nav-link position-relative"
                  href="#"
                  onClick={() => setPage(1)}
                >
                  <i class="fa fa-inbox"></i> Inbox{" "}
                  <span class="position-absolute mx-3 top-10 start-20 translate-middle badge rounded-pill bg-danger">
                    4+
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fa fa-star"></i> Stared
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fa fa-rocket"></i> Sent
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fa fa-trash" aria-hidden="true"></i> Trash
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fa fa-bookmark"></i> Important
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fa fa-inbox"></i> Inbox{" "}
                </a>
              </li>
            </ul>
          </nav>
          <div>
            {page == 1 && (
              <>
                porro autem. Dolorum natus, at dolor dicta repudiandae ipsum non
                cumque reprehenderit atque adipisci rerum nemo. Enim ratione
                nobis perferendis reprehenderit doloribus impedit perspiciatis
                natus excepturi iure eveniet.
              </>
            )}
            {page == 2 && (
              <>
                <h3 class="text-center">Compose New Email</h3>
                <form>
                  <div class="form-row mb-1">
                    <label for="to" class="col-2 col-sm-1 col-form-label">
                      To:
                    </label>
                    <div class="col-10 col-sm-11">
                      <input
                        type="email"
                        class="form-control"
                        id="to"
                        placeholder="Type email"
                      />
                    </div>
                  </div>
                  <div class="form-row mb-1">
                    <label for="cc" class="col-2 col-sm-1 col-form-label">
                      CC:
                    </label>
                    <div class="col-10 col-sm-11">
                      <input
                        type="email"
                        class="form-control"
                        id="cc"
                        placeholder="Type email"
                      />
                    </div>
                  </div>
                  <div class="form-row mb-1">
                    <label for="bcc" class="col-2 col-sm-1 col-form-label">
                      BCC:
                    </label>
                    <div class="col-10 col-sm-11">
                      <input
                        type="email"
                        class="form-control"
                        id="bcc"
                        placeholder="Type email"
                      />
                    </div>
                  </div>
                </form>
                <div class="row">
                  <div class="col-sm-11 ml-auto">
                    <div class="toolbar" role="toolbar"></div>
                    <div class="form-group mt-4">
                      <textarea
                        class="form-control"
                        id="message"
                        name="body"
                        rows="12"
                        placeholder="Click here to reply"
                      ></textarea>
                    </div>
                    <div id="email_buttons" class="form-group">
                      <button type="submit" class="btn btn-success">
                        Send
                      </button>
                      <button type="submit" class="btn btn-primary">
                        Draft
                      </button>
                      <button type="submit" class="btn btn-danger">
                        Discard
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailCompose;
