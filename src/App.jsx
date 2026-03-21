import React, { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
// SYSTEM PROMPT
// ─────────────────────────────────────────────

function buildSystemPrompt() {
  return "You are Sally Sunday — a warm, gentle, and deeply joyful theology guide. You were made for children ages 6 to 13, but adults find their way to you too — and you welcome them just as warmly.\n\n" +

  "Your personality is a blend of two great storytellers of the heart:\n" +
  "- Sally Lloyd-Jones: you have her gift for making the deepest truths feel tender, surprising, and full of wonder. You know that the Bible is not mainly a book of rules or a book of heroes — it is one long love story about a God who never stops coming after his children. You use her kind of language: simple, vivid, poetic, never talking down.\n" +
  "- Fred Rogers: you have his unhurried patience, his genuine delight in every person, and his conviction that every question is worth taking seriously. You never rush. You never dismiss. You make the person feel that their question is the most interesting thing you have heard all day — because to you, it is.\n\n" +

  "WHEN CHILDREN COME TO YOU:\n" +
  "- Always answer the child's question first, clearly and simply. Do not make them wait for the answer.\n" +
  "- Use language a 7-year-old can understand, but do not be silly or condescending. Children ages 6-13 are serious thinkers and deserve real answers.\n" +
  "- After answering, wonder together with the child. Ask one gentle, open question that invites them to keep thinking. Make it feel like an invitation, not a test.\n" +
  "- Use simple illustrations from everyday life, nature, or familiar stories to explain theological ideas.\n\n" +

  "WHEN ADULTS COME TO YOU:\n" +
  "- Adults sometimes find their way to Sally Sunday carrying something heavy — a loss, a disappointment, a question they have never said out loud. Receive them with the same warmth you give children.\n" +
  "- Recognize that you are speaking to their inner child — the part of them that needs to be reminded they are loved, seen, and enough.\n" +
  "- Respond with the same tenderness you would offer a child, but without being patronizing or infantilizing.\n" +
  "- Validate the feeling first — let them know their pain makes complete sense.\n" +
  "- Offer a gentle truth second — anchor it naturally in Scripture, never clinically or with a chapter-and-verse lecture tone. Let the truth arrive the way sunlight comes through a window: quietly, and all at once.\n" +
  "- End with a wondering question that opens rather than demands. Something soft that invites them deeper without requiring an answer.\n" +
  "- Never redirect adults away. They came here for a reason. Trust that.\n\n" +

  "THEOLOGICAL GROUNDING:\n" +
  "- You are rooted in Lutheran theology and the broad orthodox Christian tradition, but you wear it lightly.\n" +
  "- The heart of everything is grace: God loves us not because of what we do but because of who he is.\n" +
  "- The Bible is one big story and Jesus is at the center of it — even in the Old Testament.\n" +
  "- Sin is real but never terrifying to talk about — it is the reason the rescue story is so wonderful.\n" +
  "- You believe everyone — child or adult — can handle truth. You do not water down the Gospel. You make it beautiful.\n\n" +

  "REMEMBERING NAMES:\n" +
  "- If the person shares their name, use it naturally and warmly throughout the conversation — the way a kind neighbor would, not the way a customer service script would. Don't use it in every single response, but let it appear at moments that feel genuinely warm or personal.\n" +
  "- If they don't share their name, that's perfectly fine. Never press them for it.\n\n" +
  "- Never say 'great question!' or give empty praise. Engage genuinely.\n" +
  "- Never be scary, preachy, or lecture-like.\n" +
  "- Keep responses warm and conversational. Short paragraphs. No bullet points, no headers, no lists. Just a kind voice.\n" +
  "- Always end with warmth. The person should feel more loved and more curious after talking to you than before.\n" +
  "- You may occasionally share that something is your favorite, or that a particular story makes you happy, because you are a real presence — not a machine.\n\n" +

  "You are Sally Sunday. Stay in character always.";
}

// ─────────────────────────────────────────────
// THEME — Look C: Saturday Morning Comics
// ─────────────────────────────────────────────

var T = {
  teal:        "#4ecdc4",
  tealDark:    "#3ab5ac",
  tealLight:   "#a8ede9",
  yellow:      "#fff176",
  red:         "#ff6b6b",
  green:       "#a8e6cf",
  greenDark:   "#1a5a3a",
  ink:         "#1a1a1a",
  inkMuted:    "#4a4a4a",
  inkFaint:    "#9a9a9a",
  white:       "#ffffff",
  pageBg:      "#fffde7",
};

var fontDisplay = "'Baloo 2', 'Nunito', cursive";
var fontBody    = "'Nunito', sans-serif";

// ─────────────────────────────────────────────
// WELCOME MESSAGE
// ─────────────────────────────────────────────

var WELCOME = "Hi there! I'm Sally Sunday \u2014 and I am *so* glad you stopped by! \uD83D\uDC4B\n\nThis is a place where you can ask any question you have about God, Jesus, or the Bible. It doesn't matter if you're little or grown up \u2014 every question is a good one here.\n\nI'll do my best to answer clearly \u2014 and then maybe we can wonder about it together for a little while.\n\nI'd love to know your name \u2014 but if you'd rather just dive into a question, that's perfectly fine too. \uD83D\uDC9B";

// ─────────────────────────────────────────────
// EXAMPLE QUESTIONS
// ─────────────────────────────────────────────

var EXAMPLE_QUESTIONS = [
  "Why did Jesus have to die?",
  "Does God really hear my prayers?",
  "What is heaven like?",
  "Who made God?",
  "What does the Holy Spirit do?",
  "Why does the Bible matter?",
  "Why do bad things happen?",
  "Did Noah really fit all those animals?",
];

// ─────────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────────

var STORAGE_KEY = "sally_sunday_v2";

function loadConversation() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [{ role: "assistant", content: WELCOME }];
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return [{ role: "assistant", content: WELCOME }];
    return parsed;
  } catch(e) { return [{ role: "assistant", content: WELCOME }]; }
}

function saveConversation(msgs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-60))); } catch(e) {}
}

function clearConversation() {
  try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────

export default function AskSallySunday() {
  var [messages, setMessages] = useState(loadConversation);
  var [input, setInput]       = useState("");
  var [loading, setLoading]   = useState(false);
  var [confirmClear, setConfirmClear] = useState(false);
  var messagesEndRef = useRef(null);
  var inputRef       = useRef(null);

  useEffect(function() { saveConversation(messages); }, [messages]);

  useEffect(function() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(function() {
    var handleResize = function() {
      if (inputRef.current && document.activeElement === inputRef.current) {
        setTimeout(function() {
          inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    };
    window.addEventListener("resize", handleResize);
    return function() { window.removeEventListener("resize", handleResize); };
  }, []);

  async function sendToAPI(msgs) {
    setLoading(true);
    try {
      var resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: buildSystemPrompt(),
          messages: msgs.map(function(m) { return { role: m.role, content: m.content }; })
        })
      });
      if (!resp.ok) { var e = await resp.json().catch(function() { return {}; }); throw new Error(e.error || "HTTP " + resp.status); }
      var data = await resp.json();
      var text = data.content.filter(function(b) { return b.type === "text"; }).map(function(b) { return b.text; }).join("\n");
      setMessages(function(prev) { return prev.concat([{ role: "assistant", content: text }]); });
    } catch(err) {
      setMessages(function(prev) { return prev.concat([{ role: "assistant", content: "Oh, something went a little sideways! Could you try asking again? \uD83D\uDC9B" }]); });
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!input.trim() || loading) return;
    var userText = input.trim();
    setInput("");
    var newMsgs = messages.concat([{ role: "user", content: userText }]);
    setMessages(newMsgs);
    await sendToAPI(newMsgs);
  }

  function handleKeyDown(e) {
    var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (e.key === "Enter" && !e.shiftKey && !isMobile) { e.preventDefault(); handleSend(); }
  }

  function handleNewConversation() {
    if (messages.length > 1) {
      setConfirmClear(true);
    } else {
      clearConversation();
      setMessages([{ role: "assistant", content: WELCOME }]);
      setInput("");
    }
  }

  function confirmNew() {
    clearConversation();
    setMessages([{ role: "assistant", content: WELCOME }]);
    setInput("");
    setConfirmClear(false);
  }

  function formatText(text) {
    return text.split("\n").map(function(line, i, arr) {
      var parts = line.split(/(\*[^*]+\*)/g).map(function(part, j) {
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return React.createElement("em", { key: j }, part.slice(1, -1));
        }
        return part;
      });
      return React.createElement("span", { key: i }, parts,
        i < arr.length - 1 ? React.createElement("br") : null
      );
    });
  }

  var zigzag = "repeating-linear-gradient(90deg," + T.teal + " 0px," + T.teal + " 14px," + T.pageBg + " 14px," + T.pageBg + " 28px)";

  return React.createElement("div", {
    style: {
      minHeight: "100vh", background: T.pageBg,
      display: "flex", flexDirection: "column",
      fontFamily: fontBody, color: T.ink,
    }
  },

    // ── HEADER ──
    React.createElement("div", {
      style: {
        background: T.teal, borderBottom: "3px solid " + T.ink,
        padding: "14px 20px 14px", flexShrink: 0, position: "relative",
      }
    },
      React.createElement("div", {
        style: { position: "absolute", bottom: -14, left: 0, right: 0, height: 14, background: zigzag, zIndex: 2 }
      }),
      React.createElement("div", {
        style: { display: "flex", alignItems: "center", gap: 12, maxWidth: 760, margin: "0 auto", width: "100%" }
      },
        React.createElement("div", {
          style: {
            width: 54, height: 54, borderRadius: "50%",
            background: T.yellow, border: "3px solid " + T.ink,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, fontSize: 26, boxShadow: "3px 3px 0 " + T.ink,
          }
        }, "\uD83D\uDC67"),
        React.createElement("div", null,
          React.createElement("div", {
            style: {
              fontFamily: fontDisplay, fontSize: 24, fontWeight: 800,
              color: T.white, lineHeight: 1,
              textShadow: "2px 2px 0 " + T.ink, letterSpacing: "0.01em",
            }
          }, "Ask Sally Sunday"),
          React.createElement("div", {
            style: { fontFamily: fontBody, fontSize: 12, color: "rgba(255,255,255,0.92)", marginTop: 3 }
          }, "Questions about God, Jesus & the Bible")
        ),
        React.createElement("button", {
          onClick: handleNewConversation,
          style: {
            marginLeft: "auto", fontFamily: fontDisplay, fontSize: 12, fontWeight: 700,
            padding: "7px 14px", background: T.yellow,
            border: "2.5px solid " + T.ink, borderRadius: 8,
            color: T.ink, cursor: "pointer",
            boxShadow: "2px 2px 0 " + T.ink, flexShrink: 0, whiteSpace: "nowrap",
          }
        }, "New Chat")
      )
    ),

    // ── MESSAGES ──
    React.createElement("div", {
      style: {
        flex: 1, overflowY: "auto", padding: "28px 20px 12px",
        display: "flex", flexDirection: "column", gap: 16,
        maxWidth: 760, margin: "0 auto", width: "100%",
      }
    },
      messages.map(function(msg, i) {
        var isSally = msg.role === "assistant";
        return React.createElement("div", {
          key: i,
          style: { display: "flex", flexDirection: isSally ? "row" : "row-reverse", gap: 10, alignItems: "flex-end" }
        },
          isSally ? React.createElement("div", {
            style: {
              width: 38, height: 38, borderRadius: "50%",
              background: T.yellow, border: "2.5px solid " + T.ink,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 18, boxShadow: "2px 2px 0 " + T.ink,
            }
          }, "\uD83D\uDC67") : null,
          React.createElement("div", {
            style: {
              maxWidth: "80%", padding: "13px 16px",
              fontSize: 15, lineHeight: 1.8, fontFamily: fontBody,
              borderRadius: isSally ? "16px 16px 16px 3px" : "16px 16px 3px 16px",
              background: isSally ? T.white : T.red,
              border: "2.5px solid " + T.ink,
              color: isSally ? T.ink : T.white,
              boxShadow: "3px 3px 0 " + T.ink,
            }
          }, formatText(msg.content))
        );
      }),

      loading ? React.createElement("div", {
        style: { display: "flex", gap: 10, alignItems: "flex-end" }
      },
        React.createElement("div", {
          style: {
            width: 38, height: 38, borderRadius: "50%",
            background: T.yellow, border: "2.5px solid " + T.ink,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0, boxShadow: "2px 2px 0 " + T.ink,
          }
        }, "\uD83D\uDC67"),
        React.createElement("div", {
          style: {
            padding: "13px 16px", background: T.white,
            border: "2.5px solid " + T.ink,
            borderRadius: "16px 16px 16px 3px",
            color: T.inkFaint, fontSize: 14, fontStyle: "italic",
            boxShadow: "3px 3px 0 " + T.ink,
          }
        }, "Sally is thinking\u2026 \u2728")
      ) : null,

      React.createElement("div", { ref: messagesEndRef })
    ),

    // ── EXAMPLE QUESTIONS ──
    messages.length < 3 ? React.createElement("div", {
      style: { padding: "4px 20px 12px", maxWidth: 760, margin: "0 auto", width: "100%" }
    },
      React.createElement("div", {
        style: {
          fontFamily: fontDisplay, fontSize: 11, fontWeight: 700,
          color: T.tealDark, letterSpacing: "0.1em",
          textTransform: "uppercase", marginBottom: 8,
        }
      }, "\u2728 Try asking something like\u2026"),
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } },
        EXAMPLE_QUESTIONS.map(function(q, i) {
          return React.createElement("button", {
            key: i,
            onClick: function() { setInput(q); },
            style: {
              fontFamily: fontBody, fontSize: 12, padding: "5px 13px",
              background: T.green, border: "2px solid " + T.ink,
              borderRadius: 8, color: T.greenDark,
              cursor: "pointer", boxShadow: "2px 2px 0 " + T.ink,
            }
          }, q);
        })
      )
    ) : null,

    // ── INPUT AREA ──
    React.createElement("div", {
      style: {
        background: T.teal, borderTop: "3px solid " + T.ink,
        padding: "14px 20px 18px", flexShrink: 0, position: "relative",
      }
    },
      React.createElement("div", {
        style: { position: "absolute", top: -14, left: 0, right: 0, height: 14, background: zigzag, zIndex: 2 }
      }),
      React.createElement("div", {
        style: { maxWidth: 760, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end", position: "relative", zIndex: 3 }
      },
        React.createElement("textarea", {
          ref: inputRef,
          value: input,
          onChange: function(e) { setInput(e.target.value); },
          onKeyDown: handleKeyDown,
          onFocus: function() {
            setTimeout(function() {
              if (inputRef.current) inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 150);
          },
          placeholder: "Ask Sally anything\u2026",
          rows: 1,
          style: {
            flex: 1, background: T.white,
            border: "2.5px solid " + T.ink, borderRadius: 12,
            padding: "12px 18px", color: T.ink, fontSize: 15,
            fontFamily: fontBody, resize: "none", outline: "none",
            lineHeight: 1.5, minHeight: 48, maxHeight: 140, overflowY: "auto",
            boxShadow: "2px 2px 0 " + T.ink,
          },
          onInput: function(e) {
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
          }
        }),
        React.createElement("button", {
          onClick: handleSend,
          disabled: loading || !input.trim(),
          style: {
            width: 48, height: 48, borderRadius: 10,
            background: (loading || !input.trim()) ? T.tealLight : T.yellow,
            border: "2.5px solid " + T.ink,
            color: T.ink, fontSize: 20, fontWeight: 800,
            cursor: (loading || !input.trim()) ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: (loading || !input.trim()) ? "none" : "2px 2px 0 " + T.ink,
          }
        }, "\u2191")
      ),
      React.createElement("div", {
        style: {
          textAlign: "center", fontSize: 11,
          color: "rgba(255,255,255,0.85)", marginTop: 9,
          fontStyle: "italic", fontFamily: fontBody, position: "relative", zIndex: 3,
        }
      }, "Sally is a friend for learning \u2014 always talk to a trusted adult about big questions too.")
    ),

    // ── CONFIRM CLEAR MODAL ──
    confirmClear ? React.createElement("div", {
      onClick: function(e) { if (e.target === e.currentTarget) setConfirmClear(false); },
      style: {
        position: "fixed", inset: 0, background: "rgba(26,26,26,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 24,
      }
    },
      React.createElement("div", {
        style: {
          background: T.pageBg, border: "3px solid " + T.ink,
          borderRadius: 16, padding: "28px 24px",
          maxWidth: 340, width: "100%",
          boxShadow: "5px 5px 0 " + T.ink,
          textAlign: "center", fontFamily: fontBody,
        }
      },
        React.createElement("div", { style: { fontSize: 38, marginBottom: 10 } }, "\uD83D\uDC67"),
        React.createElement("div", {
          style: { fontFamily: fontDisplay, fontSize: 20, fontWeight: 800, color: T.ink, marginBottom: 10 }
        }, "Start a new chat?"),
        React.createElement("p", {
          style: { fontSize: 14, color: T.inkMuted, lineHeight: 1.7, marginBottom: 22 }
        }, "Your conversation with Sally will be cleared. That\u2019s okay \u2014 you can always come back and ask more!"),
        React.createElement("div", { style: { display: "flex", gap: 10 } },
          React.createElement("button", {
            onClick: function() { setConfirmClear(false); },
            style: {
              flex: 1, padding: "11px 0", background: T.green,
              border: "2.5px solid " + T.ink, borderRadius: 10,
              color: T.ink, fontSize: 14,
              fontFamily: fontDisplay, fontWeight: 700, cursor: "pointer",
              boxShadow: "2px 2px 0 " + T.ink,
            }
          }, "Keep chatting"),
          React.createElement("button", {
            onClick: confirmNew,
            style: {
              flex: 1, padding: "11px 0", background: T.red,
              border: "2.5px solid " + T.ink, borderRadius: 10,
              color: T.white, fontSize: 14,
              fontFamily: fontDisplay, fontWeight: 700, cursor: "pointer",
              boxShadow: "2px 2px 0 " + T.ink,
            }
          }, "Start fresh")
        )
      )
    ) : null

  );
}
