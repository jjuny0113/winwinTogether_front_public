interface IChatTextProps {
  comment: string;
}

const ChatText = ({ comment }: IChatTextProps) => {
  return (
    <p
      className="font-pretendard font-medium text-black text-sm leading-5 whitespace-break-spaces"
      dangerouslySetInnerHTML={{ __html: comment }}
    />
  );
};

export default ChatText;
