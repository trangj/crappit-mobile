import React, {
  createContext, ReactNode, useContext, useMemo, useRef, useState,
} from 'react';
import { Comment } from '../../types/entities/comment';

type AddCommentProviderProps ={
  addCommentRef: React.MutableRefObject<undefined> | null,
  type: 'comment' | 'reply',
  setType: React.Dispatch<React.SetStateAction<'comment' | 'reply'>>,
  parentComment: Comment | null,
  setParentComment: React.Dispatch<React.SetStateAction<Comment | null>>,
}

const AddCommentContext = createContext<AddCommentProviderProps>({} as AddCommentProviderProps);

export function AddCommentProvider({ children } : {children: ReactNode}) {
  const addCommentRef = useRef();
  const [type, setType] = useState<'comment' | 'reply'>('comment');
  const [parentComment, setParentComment] = useState<Comment | null>(null);

  const value = useMemo(() => ({
    addCommentRef,
    type,
    setType,
    parentComment,
    setParentComment,
  }), [addCommentRef, type, parentComment]);

  return (
    <AddCommentContext.Provider
      value={value}
    >
      {children}
    </AddCommentContext.Provider>
  );
}

export const useAddCommentContext = () => useContext(AddCommentContext);
