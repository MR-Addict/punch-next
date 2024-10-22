import Link from "next/link";

export default function Anchor(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  // If the href starts with "/", it's an internal link
  if (props.href?.startsWith("/")) {
    return (
      <Link {...props} href={props.href}>
        {props.children}
      </Link>
    );
  }

  // Others considered as external links
  return (
    <a {...props} target="_blank">
      {props.children}
    </a>
  );
}
