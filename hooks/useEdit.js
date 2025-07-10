import { useRef } from "react";

function useEdit(id) {
  const ref = useRef(null);

  ref.current = id ? true : false;

  return { isEdit: ref.current };
}
export default useEdit;
