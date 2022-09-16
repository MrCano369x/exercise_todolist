export default function Modal({ state, close, children }) {
  return (
    <div className={`modal ${state ? "is-active" : ""}`}>
      <div className="modal-background" onClick={close} />
      <div className="modal-content">{children}</div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={close}
      ></button>
    </div>
  );
}
