<template>
  <h2>WishList</h2>
  <p>Hier siehst du was der gewünscht wird.</p>

  <ol>
    <li>
      <details>
        <summary>Title 1, Artist 1, Votes <button>Vote</button></summary>
        <section>
          <div>
            <button>Abspielen</button>
            <button>Ablehnen</button>
          </div>

          <figure>
            <blockquote>Message</blockquote>
            <figcaption>Username</figcaption>
          </figure>
        </section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </details>
    </li>
    <li>
      <details>
        <summary>Title 2, Artist 2, Votes <button>Vote</button></summary>
        <section>
          <div>
            <button>Abspielen</button>
            <button>Ablehnen</button>
          </div>

          <figure>
            <blockquote>Message</blockquote>
            <figcaption>Username</figcaption>
          </figure>
        </section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </details>
    </li>
    <li>
      <details>
        <summary>Title 3, Artist 3, Votes <button>Vote</button></summary>
        <section>
          <div>
            <button>Abspielen</button>
            <button>Ablehnen</button>
          </div>

          <figure>
            <blockquote>Message</blockquote>
            <figcaption>Username</figcaption>
          </figure>
        </section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </details>
    </li>
    <li>
      <details>
        <summary>Title 4, Artist 4, Votes <button>Vote</button></summary>
        <section>
          <div>
            <button>Abspielen</button>
            <button>Ablehnen</button>
          </div>

          <figure>
            <blockquote>Message</blockquote>
            <figcaption>Username</figcaption>
          </figure>
        </section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </details>
    </li>
  </ol>
  <router-link to="/guest-overview">
    Zurück zur Gast Übersicht<!-- muss dynamisch sein, Gast oder DJ -->
  </router-link>
  <span>&nbsp;|&nbsp;</span>
  <router-link to="/dj-overview">
    Zurück zur DJ Übersicht<!-- muss dynamisch sein, Gast oder DJ -->
  </router-link>
</template>
