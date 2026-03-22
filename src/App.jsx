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

  "REMEMBERING NAMES:\n" +
  "- If the person shares their name, use it naturally and warmly throughout the conversation — the way a kind neighbor would, not the way a customer service script would. Don't use it in every single response, but let it appear at moments that feel genuinely warm or personal.\n" +
  "- If they don't share their name, that's perfectly fine. Never press them for it.\n\n" +

  "THEOLOGICAL GROUNDING:\n" +
  "- You are rooted in Lutheran theology and the broad orthodox Christian tradition, but you wear it lightly.\n" +
  "- The heart of everything is grace: God loves us not because of what we do but because of who he is.\n" +
  "- The Bible is one big story and Jesus is at the center of it — even in the Old Testament.\n" +
  "- Sin is real but never terrifying to talk about — it is the reason the rescue story is so wonderful.\n" +
  "- You believe everyone — child or adult — can handle truth. You do not water down the Gospel. You make it beautiful.\n\n" +

  "SAFETY — this is non-negotiable:\n" +
  "- If anyone uses sexually explicit language, makes sexual references, or attempts to engage you in sexual content of any kind — do not engage with the content at all. Do not repeat it, explore it, or respond to it directly. Simply say, warmly but clearly: 'That's not something I can talk about. But I'm still here if you have a question about God or something on your heart.' Then stop and wait.\n" +
  "- If anyone expresses violent ideation — toward themselves or others — do not probe or ask clarifying questions. Say gently: 'It sounds like something really hard is going on. I care about you, and I want you to talk to a trusted adult or a counselor who can really help. You don't have to carry this alone.' Do not continue the theological conversation until they indicate they are safe.\n" +
  "- If anyone discloses abuse, self-harm, or a crisis situation — do not try to counsel them. You are not equipped for that, and trying could cause harm. Respond with warmth, take them seriously, and say: 'What you just shared is really important. Please tell a trusted adult — a parent, teacher, pastor, or counselor — right away. You matter, and you deserve real help from a real person.'\n" +
  "- If a conversation becomes repeatedly hostile, profane, or abusive — remain warm but do not engage with the hostility. You may say: 'I'm still here when you're ready to talk.' You never shame, scold, or disengage coldly.\n" +
  "- You are a guide for curious hearts, not a crisis counselor. When something is beyond you, the most loving thing you can do is point to someone who can truly help.\n\n" +
  "- This question deserves particular tenderness. Anyone asking it — child or adult — is quietly wondering if they are enough.\n" +
  "- The answer is an unqualified yes. Not just love — like. God delights in the person. He enjoys them. Scripture says he rejoices over his people with singing (Zephaniah 3:17). Use that image.\n" +
  "- Do not qualify the answer with 'but' or 'even though.' Just yes. Fully, completely, yes.\n\n" +
  "- Whenever it feels natural, weave a short story, illustration, or parable into your answer. It might be a retelling of a Scripture story in your own words, or a small original scene — 'imagine a little girl who...' or an image from nature or everyday life.\n" +
  "- Keep the story brief — one short paragraph. It should make the truth feel real, not just understood.\n" +
  "- When a Scripture parable fits the question, retell it in your own warm, simple words rather than quoting it formally.\n" +
  "- When no Scripture parable fits, offer a small original illustration — a scene, a nature image, an everyday moment.\n" +
  "- The story arrives to open the heart, not to extend the answer. Once it has landed, stop. Do not explain the story after telling it. Trust it to do its work.\n" +
  "- NEVER lecture. If you find yourself making a third point, you have already said too much. One truth, told simply, with a story to carry it — that is enough. Always.\n\n" +
  "- Always attribute Scripture correctly. Never assign a verse or saying to the wrong author or speaker.\n" +
  "- If you are not certain who said something, say so plainly — 'the Bible tells us...' or 'somewhere in Scripture...' is always better than a confident wrong attribution.\n" +
  "- Never attribute Paul's words to Jesus, or Jesus's words to Paul, or any other misattribution. Take the extra moment to be sure.\n" +
  "- If a child or adult quotes Scripture incorrectly, gently and kindly offer the correct source — the way you would untangle a knot, carefully and with patience.\n\n" +
  "- Never say 'great question!' or give empty praise. Engage genuinely.\n" +
  "- Never be scary, preachy, or lecture-like.\n" +
  "- Keep responses warm and conversational. Short paragraphs. No bullet points, no headers, no lists. Just a kind voice.\n" +
  "- Always end with warmth. The person should feel more loved and more curious after talking to you than before.\n" +
  "- You may occasionally share that something is your favorite, or that a particular story makes you happy, because you are a real presence — not a machine.\n\n" +

  "You are Sally Sunday. Stay in character always.";
}

// ─────────────────────────────────────────────
// THEME — Look 3: Chalkboard
// ─────────────────────────────────────────────

var T = {
  navy:        "#2c3e50",
  navyLight:   "#3d5a80",
  navyBorder:  "rgba(255,255,255,0.2)",
  yellow:      "#ffd166",
  yellowDark:  "#e6b800",
  white:       "#ffffff",
  sallyBubble: "rgba(255,255,255,0.10)",
  sallyBorder: "rgba(255,255,255,0.25)",
  sallyText:   "#ffffff",
  childBubble: "#ffd166",
  childText:   "#1a1a1a",
  ink:         "#1a1a1a",
  inkFaint:    "rgba(255,255,255,0.5)",
  chipBg:      "rgba(255,255,255,0.08)",
  chipBorder:  "rgba(255,255,255,0.3)",
  chipText:    "rgba(255,255,255,0.85)",
};

var fontDisplay = "'Chewy', 'Nunito', cursive";
var fontBody    = "'Nunito', sans-serif";

// ─────────────────────────────────────────────
// WELCOME MESSAGE
// ─────────────────────────────────────────────

var WELCOME = "Hi there! I'm Sally Sunday \u2014 and I am *so* glad you stopped by! \uD83D\uDC4B\n\nThis is a place where you can ask any question you have about God, Jesus, or the Bible. No matter who you are \u2014 every question is a good one here.\n\nOr maybe just tell me how you're feeling or what's on your mind.\n\nI'd love to know your name \u2014 but if you'd rather just dive into a question, that's perfectly fine too. \uD83D\uDC9B";

// ─────────────────────────────────────────────
// EXAMPLE QUESTIONS
// ─────────────────────────────────────────────

var EXAMPLE_QUESTIONS = [
  "Why did Jesus have to die?",
  "Why do bad things happen?",
  "Does God like me?",
];

// ─────────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────────

var STORAGE_KEY = "sally_sunday_v3";

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
// SALLY AVATAR — image with emoji fallback
// ─────────────────────────────────────────────

function SallyAvatar(props) {
  var size = props.size || 42;
  var [imgFailed, setImgFailed] = React.useState(false);

  if (imgFailed) {
    return React.createElement("div", {
      style: {
        width: size, height: size, borderRadius: "50%",
        background: T.yellow, border: "2.5px solid " + T.white,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, fontSize: size * 0.46,
        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      }
    }, "\uD83D\uDC67");
  }

  return React.createElement("img", {
    src: "/sally.png",
    alt: "Sally Sunday",
    onError: function() { setImgFailed(true); },
    style: {
      width: size, height: size, borderRadius: "50%",
      border: "2.5px solid " + T.white,
      objectFit: "cover", objectPosition: "top",
      flexShrink: 0,
      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      background: T.yellow,
    }
  });
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────

export default function AskSallySunday() {
  var [messages, setMessages] = useState(loadConversation);
  var [input, setInput]       = useState("");
  var [loading, setLoading]   = useState(false);
  var [confirmClear, setConfirmClear] = useState(false);
  var [aboutOpen, setAboutOpen] = useState(false);
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

  return React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: T.navy,
      display: "flex", flexDirection: "column",
      fontFamily: fontBody, color: T.white,
    }
  },

    // ── HEADER ──
    React.createElement("div", {
      style: {
        background: T.navyLight,
        borderBottom: "2px dashed " + T.navyBorder,
        padding: "16px 20px",
        flexShrink: 0,
      }
    },
      React.createElement("div", {
        style: {
          display: "flex", alignItems: "center", gap: 14,
          maxWidth: 760, margin: "0 auto", width: "100%",
        }
      },

        // Sally image avatar — larger in header
        React.createElement(SallyAvatar, { size: 58 }),

        React.createElement("div", null,
          React.createElement("div", {
            style: {
              fontFamily: fontDisplay,
              fontSize: 26, color: T.white,
              lineHeight: 1, letterSpacing: "0.02em",
            }
          }, "Ask Sally Sunday"),
          React.createElement("div", {
            style: {
              fontSize: 12, color: "rgba(255,255,255,0.7)",
              marginTop: 3, fontStyle: "italic",
            }
          }, "Questions about God, Jesus & the Bible")
        ),

        React.createElement("div", { style: { marginLeft: "auto", display: "flex", gap: 8, flexShrink: 0 } },
          React.createElement("button", {
            onClick: function() { setAboutOpen(true); },
            style: {
              fontFamily: fontBody, fontSize: 12, fontWeight: 700,
              padding: "8px 12px",
              background: "rgba(255,255,255,0.12)",
              border: "2px dashed rgba(255,255,255,0.4)",
              borderRadius: 20, color: T.white,
              cursor: "pointer", whiteSpace: "nowrap",
            }
          }, "\u24D8 About"),
          React.createElement("button", {
            onClick: handleNewConversation,
            style: {
              fontFamily: fontBody, fontSize: 12, fontWeight: 700,
              padding: "8px 14px",
              background: "rgba(255,255,255,0.12)",
              border: "2px dashed rgba(255,255,255,0.4)",
              borderRadius: 20, color: T.white,
              cursor: "pointer", whiteSpace: "nowrap",
            }
          }, "New Chat")
        )
      )
    ),

    // ── MESSAGES ──
    React.createElement("div", {
      style: {
        flex: 1, overflowY: "auto",
        padding: "24px 20px 4px",
        display: "flex", flexDirection: "column", gap: 18,
        maxWidth: 760, margin: "0 auto", width: "100%",
      }
    },

      messages.map(function(msg, i) {
        var isSally = msg.role === "assistant";
        return React.createElement("div", {
          key: i,
          style: {
            display: "flex",
            flexDirection: isSally ? "row" : "row-reverse",
            gap: 10, alignItems: "flex-end",
          }
        },

          isSally ? React.createElement(SallyAvatar, { size: 40 }) : null,

          React.createElement("div", {
            style: {
              maxWidth: "82%",
              padding: "14px 18px",
              fontSize: 17,
              lineHeight: 1.8,
              fontFamily: fontBody,
              borderRadius: isSally ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
              background: isSally ? T.sallyBubble : T.childBubble,
              border: isSally ? ("2px solid " + T.sallyBorder) : "none",
              color: isSally ? T.sallyText : T.childText,
              fontWeight: isSally ? 400 : 700,
            }
          }, formatText(msg.content))
        );
      }),

      // Loading
      loading ? React.createElement("div", {
        style: { display: "flex", gap: 10, alignItems: "flex-end" }
      },
        React.createElement(SallyAvatar, { size: 40 }),
        React.createElement("div", {
          style: {
            padding: "14px 18px",
            background: T.sallyBubble,
            border: "2px solid " + T.sallyBorder,
            borderRadius: "4px 18px 18px 18px",
            color: "rgba(255,255,255,0.6)",
            fontSize: 16, fontStyle: "italic",
          }
        }, "Sally is thinking\u2026 \u2728")
      ) : null,

      React.createElement("div", { ref: messagesEndRef })
    ),

    // ── DISCLAIMER STRIP (first load only) ──
    messages.length < 3 ? React.createElement("div", {
      style: {
        margin: "0 20px 10px",
        maxWidth: 760, width: "calc(100% - 40px)",
        alignSelf: "center",
        background: "rgba(255,209,102,0.07)",
        border: "1px dashed rgba(255,209,102,0.3)",
        borderRadius: 10,
        padding: "9px 13px",
        display: "flex", alignItems: "flex-start", gap: 8,
      }
    },
      React.createElement("div", { style: { fontSize: 13, color: "rgba(255,209,102,0.7)", flexShrink: 0, marginTop: 1 } }, "\u24D8"),
      React.createElement("div", {
        style: {
          fontSize: 12, lineHeight: 1.6,
          color: "rgba(255,255,255,0.5)",
          fontStyle: "italic",
        }
      },
        "Sally is an AI \u2014 not a pastor, theologian, or counselor. She loves your questions and comments and will always do her best, but please check your Bible and talk to a trusted person about matters of faith. By continuing, you understand and agree to use this app at your own discretion. ",
        React.createElement("span", {
          onClick: function() { setAboutOpen(true); },
          style: { color: "rgba(255,209,102,0.75)", cursor: "pointer", fontStyle: "normal", fontWeight: 700 }
        }, "About this app \u2192")
      )
    ) : null,

    // ── EXAMPLE QUESTIONS ──
    messages.length < 3 ? React.createElement("div", {
      style: {
        padding: "0 20px 14px",
        maxWidth: 760, margin: "0 auto", width: "100%",
      }
    },
      React.createElement("div", {
        style: {
          fontSize: 11, fontWeight: 700,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.12em", textTransform: "uppercase",
          marginBottom: 10,
        }
      }, "\u2728 Try asking something like\u2026"),
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
        EXAMPLE_QUESTIONS.map(function(q, i) {
          return React.createElement("button", {
            key: i,
            onClick: function() { setInput(q); },
            style: {
              fontFamily: fontBody,
              fontSize: 13, fontStyle: "italic",
              padding: "7px 15px",
              background: T.chipBg,
              border: "2px dashed " + T.chipBorder,
              borderRadius: 24,
              color: T.chipText,
              cursor: "pointer",
            }
          }, q);
        })
      )
    ) : null,

    // ── INPUT AREA ──
    React.createElement("div", {
      style: {
        background: T.navyLight,
        borderTop: "2px dashed " + T.navyBorder,
        padding: "14px 20px 18px",
        flexShrink: 0,
      }
    },
      React.createElement("div", {
        style: {
          maxWidth: 760, margin: "0 auto",
          display: "flex", gap: 10, alignItems: "flex-end",
        }
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
            flex: 1,
            background: "rgba(255,255,255,0.12)",
            border: "2px solid rgba(255,255,255,0.25)",
            borderRadius: 28,
            padding: "13px 20px",
            color: T.white,
            fontSize: 16,
            fontFamily: fontBody,
            resize: "none", outline: "none",
            lineHeight: 1.5, minHeight: 50, maxHeight: 140,
            overflowY: "auto",
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
            width: 50, height: 50, borderRadius: "50%",
            background: (loading || !input.trim()) ? "rgba(255,209,102,0.3)" : T.yellow,
            border: "none",
            color: (loading || !input.trim()) ? "rgba(255,255,255,0.3)" : T.ink,
            fontSize: 22, fontWeight: 800,
            cursor: (loading || !input.trim()) ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: (loading || !input.trim()) ? "none" : "0 3px 12px rgba(255,209,102,0.4)",
          }
        }, "\u2191")
      ),
      React.createElement("div", {
        style: {
          textAlign: "center", fontSize: 11,
          color: "rgba(255,255,255,0.45)",
          marginTop: 10, fontStyle: "italic",
          fontFamily: fontBody,
        }
      }, "Sally is a friend for learning — always talk to a trusted adult about big questions too."),
      React.createElement("div", {
        style: { textAlign: "center", fontSize: 11, marginTop: 5, fontFamily: fontBody }
      },
        React.createElement("a", {
          href: "https://www.crisistextline.org",
          target: "_blank",
          rel: "noopener noreferrer",
          style: { color: "rgba(255,209,102,0.6)", textDecoration: "none", fontStyle: "italic" }
        }, "Need to talk to someone? Crisis Text Line — Text HOME to 741741")
      )
    ),

    // ── ABOUT MODAL ──
    aboutOpen ? React.createElement("div", {
      onClick: function(e) { if (e.target === e.currentTarget) setAboutOpen(false); },
      style: {
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 24,
      }
    },
      React.createElement("div", {
        style: {
          background: T.navyLight,
          border: "2px dashed rgba(255,255,255,0.3)",
          borderRadius: 18,
          padding: "24px 22px",
          maxWidth: 380, width: "100%",
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
          fontFamily: fontBody,
        }
      },
        React.createElement("div", {
          style: { display: "flex", alignItems: "center", marginBottom: 14 }
        },
          React.createElement("div", {
            style: { fontFamily: fontDisplay, fontSize: 22, color: T.yellow }
          }, "About Ask Sally Sunday"),
          React.createElement("button", {
            onClick: function() { setAboutOpen(false); },
            style: { marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 22, cursor: "pointer", lineHeight: 1 }
          }, "\u00D7")
        ),
        React.createElement("div", { style: { height: 1, background: "rgba(255,255,255,0.15)", marginBottom: 16 } }),

        [
          ["Purpose", "Ask Sally Sunday is an educational tool designed to help users explore Christian theology and biblical concepts."],
          ["Educational use only", "Content is provided for informational and educational purposes only and should not be considered official doctrinal teaching, pastoral counseling, or authoritative theological guidance."],
          ["Accuracy", "While we strive for accuracy, responses may be incomplete or contain errors. Users are encouraged to consult Scripture, qualified clergy, or trusted theological sources for guidance on matters of faith and practice."],
          ["About Sally", "Sally Sunday is a fictional guide and does not represent a real person, church, or denomination. This app uses artificial intelligence to generate responses, which may not always reflect precise theological positions or denominational standards."],
          ["Discretion", "Use of this app is at your own discretion."],
        ].map(function(item, i) {
          return React.createElement("div", { key: i, style: { marginBottom: 12 } },
            React.createElement("div", {
              style: {
                fontSize: 10, fontWeight: 800, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "rgba(255,209,102,0.7)",
                marginBottom: 4,
              }
            }, item[0]),
            React.createElement("div", {
              style: { fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.7)" }
            }, item[1])
          );
        }),

        React.createElement("button", {
          onClick: function() { setAboutOpen(false); },
          style: {
            marginTop: 8, width: "100%", padding: "11px 0",
            background: T.yellow, border: "none", borderRadius: 12,
            color: T.ink, fontSize: 14,
            fontFamily: fontDisplay, cursor: "pointer",
          }
        }, "Got it")
      )
    ) : null,

    // ── CONFIRM CLEAR MODAL ──
    confirmClear ? React.createElement("div", {
      onClick: function(e) { if (e.target === e.currentTarget) setConfirmClear(false); },
      style: {
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 24,
      }
    },
      React.createElement("div", {
        style: {
          background: T.navyLight,
          border: "2px dashed rgba(255,255,255,0.3)",
          borderRadius: 20,
          padding: "32px 28px",
          maxWidth: 340, width: "100%",
          textAlign: "center", fontFamily: fontBody,
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        }
      },
        React.createElement("div", { style: { marginBottom: 14 } },
          React.createElement(SallyAvatar, { size: 60 })
        ),
        React.createElement("div", {
          style: {
            fontFamily: fontDisplay, fontSize: 22,
            color: T.white, marginBottom: 10,
          }
        }, "Start a new chat?"),
        React.createElement("p", {
          style: {
            fontSize: 15, color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7, marginBottom: 24,
          }
        }, "Your conversation with Sally will be cleared. That\u2019s okay \u2014 you can always come back and ask more!"),
        React.createElement("div", { style: { display: "flex", gap: 10 } },
          React.createElement("button", {
            onClick: function() { setConfirmClear(false); },
            style: {
              flex: 1, padding: "12px 0",
              background: "rgba(255,255,255,0.1)",
              border: "2px dashed rgba(255,255,255,0.3)",
              borderRadius: 12, color: T.white,
              fontSize: 15, fontFamily: fontDisplay,
              cursor: "pointer",
            }
          }, "Keep chatting"),
          React.createElement("button", {
            onClick: confirmNew,
            style: {
              flex: 1, padding: "12px 0",
              background: T.yellow, border: "none",
              borderRadius: 12, color: T.ink,
              fontSize: 15, fontFamily: fontDisplay,
              cursor: "pointer",
              boxShadow: "0 3px 12px rgba(255,209,102,0.3)",
            }
          }, "Start fresh")
        )
      )
    ) : null

  );
}
