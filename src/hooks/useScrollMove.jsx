import { createBrowserHistory } from "history";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useScrollMove = ({ page, path, dom }) => {
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const { id } = useParams();
  // const history = useHistory();
  const [scrollInfos, setScrollInfos] = useState(() =>
    localStorage.getItem(`${page}_scroll_pos`)
  );
  const scrollSave = useCallback(() => {
    const scrollPos = dom ? dom.scrollTop : window.scrollY;
    setScrollInfos(scrollPos);
    return localStorage.setItem(`${page}_scroll_pos`, scrollPos);
  }, [dom]);

  const scrollRemove = useCallback(() => {
    setScrollInfos(0);
    localStorage.removeItem(`${page}_scroll_pos`);
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (id?.isExact && location.pathname !== path) {
        scrollSave();
      }
    });
  }, [history, scrollSave, id, path]);

  return { scrollInfos, scrollRemove };
};

export default useScrollMove;
