import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { resetTooltip, setTooltip } from '../../actions/tooltip';

export default function Tooltipable({ title = '???', description = '???', connected = false, children }) {
  const dispatch = useDispatch();
  const subject = useRef();

  const enter = (e) => {
    if (e.pointerType !== 'mouse') {
      return;
    }
    dispatch(setTooltip(title, description, connected));
  };

  const leave = () => {
    dispatch(resetTooltip());
  };

  useEffect(() => {
    if (subject.current) {
      subject.current.addEventListener('pointerenter', enter);
      subject.current.addEventListener('pointerleave', leave);
    }
    return () => {
      if (subject.current) {
        subject.current.removeEventListener('pointerenter', enter);
        subject.current.removeEventListener('pointerleave', leave);
      }
      dispatch(resetTooltip());
    };
  }, []);

  return children(subject);
}
