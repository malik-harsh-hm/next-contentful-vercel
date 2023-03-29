// TODO: Refactor these types so we don't risk circular references
import type { AssetData } from "./base";

export type RichTextBlockType =
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "ol"
  | "ul"
  | "li"
  | "hr"
  | "blockquote"
  | "code"
  | "table"
  | "thead"
  | "tbody"
  | "tr"
  | "th"
  | "td"
  | "embeddedEntry"
  | "embeddedAsset";

export type RichTextInlineType =
  | "span"
  | "hyperlink"
  | "entryHyperlink"
  | "assetHyperlink"
  | "inlineEmbeddedEntry"
  | "inlineEmbeddedAsset";

export type RichTextMark =
  | "bold"
  | "italic"
  | "underline"
  | "code"
  | "strikethrough";
export const RICH_TEXT_MARKS = [
  "bold",
  "italic",
  "underline",
  "code",
  "strikethrough",
] as const;

export interface RichTextDocumentNode {
  type: "document";
  content: RichTextBlockNode[];
}

export interface RichTextTextNode {
  type: "text";
  value: string;
  marks: RichTextMark[];
}

export type RichTextNodeType =
  | "document"
  | "text"
  | RichTextBlockType
  | RichTextInlineType;

export type RichTextAlignment = "left" | "center" | "right" | "justify";

interface RichTextBlockNodeBase {
  id?: string;
  align?: RichTextAlignment;
  type: RichTextBlockType;
}

export interface HeadingNode extends RichTextBlockNodeBase {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  content: Array<RichTextInlineNode | RichTextTextNode>;
}

export interface ParagraphNode extends RichTextBlockNodeBase {
  type: "p";
  content: Array<RichTextInlineNode | RichTextTextNode>;
}

export interface BlockquoteNode extends RichTextBlockNodeBase {
  type: "blockquote";
  content: Array<RichTextInlineNode | RichTextTextNode>;
}

export interface CodeNode extends RichTextBlockNodeBase {
  type: "code";
  language?: string;
  content: Array<RichTextInlineNode | RichTextTextNode>;
}

export interface HorizontalRuleNode extends RichTextBlockNodeBase {
  type: "hr";
}

export interface OrderedListNode extends RichTextBlockNodeBase {
  type: "ol";
  content: ListItemNode[];
}

export interface UnorderedListNode extends RichTextBlockNodeBase {
  type: "ul";
  content: ListItemNode[];
}

export interface ListItemNode extends RichTextBlockNodeBase {
  type: "li";
  content: Array<RichTextBlockNode | RichTextInlineNode | RichTextTextNode>;
}

export interface EntryBlockNode extends RichTextBlockNodeBase {
  type: "embeddedEntry";
  // TODO: implement?
  entryId: string;
  contentType: string;
}

export interface AssetBlockNode extends RichTextBlockNodeBase {
  type: "embeddedAsset";
  assetId: string;
  asset: AssetData;
  caption?: string;
  href?: string;
}

interface RichTextInlineNodeBase {
  id?: string;
}

export interface EntryInlineNode extends RichTextInlineNodeBase {
  type: "inlineEmbeddedEntry";
  // TODO: implement?
  entryId: string;
  contentType: string;
}

export interface AssetInlineNode extends RichTextInlineNodeBase {
  type: "inlineEmbeddedAsset";
  assetId: string;
  asset: AssetData;
  caption?: string;
  href?: string;
}

export interface HyperlinkNode extends RichTextInlineNodeBase {
  type: "hyperlink";
  href: string;
  content: Array<RichTextInlineNode | RichTextTextNode>;
}

export interface AssetHyperlinkNode extends RichTextInlineNodeBase {
  type: "assetHyperlink";
  href: string;
  assetId: string;
  content: Array<RichTextInlineNode | RichTextTextNode>;
}

export interface EntryHyperlinkNode extends RichTextInlineNodeBase {
  type: "entryHyperlink";
  href: string;
  entryId: string;
  contentType: string;
  content: Array<RichTextInlineNode | RichTextTextNode>;
}

export type RichTextLinkNode =
  | HyperlinkNode
  | AssetHyperlinkNode
  | EntryHyperlinkNode;

export interface SpanNode extends RichTextInlineNodeBase {
  type: "span";
  content: Array<RichTextInlineNode | RichTextTextNode>;
}

export interface TableCellNode extends RichTextBlockNodeBase {
  type: "td";

  colspan?: number;
  rowspan?: number;

  content: ParagraphNode[];
}

export interface TableHeaderCellNode extends RichTextBlockNodeBase {
  type: "th";

  colspan?: number;
  rowspan?: number;

  content: ParagraphNode[];
}

export type RichTextTableCellNode = TableCellNode | TableHeaderCellNode;

export interface TableRowNode extends RichTextBlockNodeBase {
  type: "tr";
  content: RichTextTableCellNode[];
}

export interface TableHeaderNode extends RichTextBlockNodeBase {
  type: "thead";
  content: TableRowNode[];
}

export interface TableBodyNode extends RichTextBlockNodeBase {
  type: "tbody";
  content: TableRowNode[];
}

export interface TableNode extends RichTextBlockNodeBase {
  type: "table";
  content: Array<TableHeaderNode | TableBodyNode | TableRowNode>;
}

export type RichTextBlockNode =
  | HeadingNode
  | ParagraphNode
  | BlockquoteNode
  | CodeNode
  | HorizontalRuleNode
  | OrderedListNode
  | UnorderedListNode
  | ListItemNode
  | EntryBlockNode
  | AssetBlockNode
  | TableNode
  | TableHeaderNode
  | TableBodyNode
  | TableRowNode
  | TableCellNode
  | TableHeaderCellNode;

export type RichTextInlineNode =
  | EntryInlineNode
  | AssetInlineNode
  | HyperlinkNode
  | AssetHyperlinkNode
  | EntryHyperlinkNode
  | SpanNode;

export type RichTextNode =
  | RichTextBlockNode
  | RichTextInlineNode
  | RichTextTextNode
  | RichTextDocumentNode;
