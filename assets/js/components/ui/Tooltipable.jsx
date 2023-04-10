import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetTooltip, setTooltip } from '../../actions/tooltip';

export default function Tooltipable({ children }) {
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(resetTooltip()), []);

  const onMouseEnter = (title, description, connected = false) => {
    dispatch(setTooltip(title, description, connected));
  };

  const onMouseLeave = () => {
    dispatch(resetTooltip());
  };

  return children(onMouseEnter, onMouseLeave);
}
