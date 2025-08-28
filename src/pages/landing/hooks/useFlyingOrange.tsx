/* eslint-disable */
import { useEffect } from 'react';

export const useFlyingOrange = () => {
  useEffect(() => {
    (function () {
      'use strict';
      class r {
        constructor(t, i) {
          (this.x = t), (this.y = i);
        }
        MultiplyScalar(t) {
          return (this.x *= t), (this.y *= t), this;
        }
        AddWithScalar(t, i) {
          return (this.x += t.x * i), (this.y += t.y * i), this;
        }
        Magnitude() {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        Normalize() {
          let t = this.Magnitude();
          return t == 0 ? this : ((this.x /= t), (this.y /= t), this);
        }
        Clone() {
          return new r(this.x, this.y);
        }
        Add(t) {
          return (this.x += t.x), (this.y += t.y), this;
        }
        Subtract(t) {
          return (this.x -= t.x), (this.y -= t.y), this;
        }
        Dot(t) {
          return this.x * t.x + this.y * t.y;
        }
        static Add(t, i) {
          return new r(t.x + i.x, t.y + i.y);
        }
        static MultiplyScalar(t, i) {
          return new r(t.x * i, t.y * i);
        }
        static Normalize(t) {
          let i = t.Magnitude();
          return new r(t.x / i, t.y / i);
        }
        static Distance(t, i) {
          return new r(t.x - i.x, t.y - i.y).Magnitude();
        }
        static RotationToVector(t) {
          return new r(Math.cos(t), Math.sin(t));
        }
        static Lerp(t, i, s) {
          return new r(t.x + (i.x - t.x) * s, t.y + (i.y - t.y) * s);
        }
      }
      class v {
        constructor(t, i, s, o) {
          (this.mass = t),
            (this.position = i),
            (this.velocity = s),
            (this.collider = o),
            (this.bounceFactor = 0.75),
            (this.isStatic = !1),
            (this.physicPriority = 0),
            (this.onPhysicUpdate = () => {});
        }
        UpdatePosition(t) {
          this.position.AddWithScalar(this.velocity, t);
        }
        AddForce(t, i) {
          this.velocity.AddWithScalar(i.MultiplyScalar(1 / this.mass), t);
        }
      }
      class R {
        constructor(t, i, s) {
          (this.position = t),
            (this.rotation = i),
            (this.mesh = s),
            (this.renderPriority = 0),
            (this.onRender = () => {});
        }
      }
      class x {
        constructor(t) {
          this.angle = t;
        }
        LookAt(t, i) {
          const s = i.Clone().Subtract(t);
          this.angle = Math.atan2(s.y, s.x);
        }
        Degree() {
          return this.angle * (180 / Math.PI);
        }
        Vector() {
          return new r(Math.cos(this.angle), Math.sin(this.angle));
        }
        Clone() {
          return new x(this.angle);
        }
        Rotate(t) {
          return (this.angle += t), this;
        }
      }
      let S = class {
        constructor(t = new r(0, 0), i, s) {
          (this.uuid = crypto.randomUUID()),
            (this.rotation = new x(0)),
            (this.onFrameUpdate = () => {}),
            (this.position = t),
            (this.rigidbody = new v(1, this.position, new r(0, 0), i)),
            (this.renderbody = new R(this.position, this.rotation, s));
        }
      };
      class F {
        constructor(t = !0) {
          this.collidable = t;
        }
      }
      class w extends F {
        constructor(t) {
          super(), (this.radius = t);
        }
      }
      class A {
        constructor(t, i, s) {
          (this.domain = t),
            (this.deltaTime = i),
            (this.meterToPixel = s),
            (this.physicPool = []),
            (this.constantForce = new r(0, 0.981)),
            (this.subStepIteration = 1),
            (this.simulationSpeed = 1),
            (this.gravity = !0),
            (this.simpleDrag = 0.99),
            window.addEventListener('resize', () => {
              (this.domain.x = window.innerWidth), (this.domain.y = window.innerHeight);
            });
        }
        PushRigidBody(t) {
          this.physicPool.push(t), this.SortPhysicSequence();
        }
        PopRigidBody(t) {
          this.physicPool = this.physicPool.filter((i) => i !== t);
        }
        SortPhysicSequence() {
          this.physicPool.sort((t, i) => t.physicPriority - i.physicPriority);
        }
        UpdatePhysics() {
          const t = this.deltaTime * this.meterToPixel * this.simulationSpeed;
          for (let i = 0; i < this.subStepIteration; i++) {
            if (this.gravity)
              for (let s = 0; s < this.physicPool.length; s++) {
                const o = this.physicPool[s];
                o.isStatic || o.AddForce(t / this.subStepIteration, this.constantForce);
              }
            for (let s = 0; s < this.physicPool.length; s++) {
              const o = this.physicPool[s];
              o.isStatic || o.UpdatePosition(t / this.subStepIteration);
            }
            for (let s = 0; s < this.physicPool.length; s++) {
              const o = this.physicPool[s];
              o.collider.collidable &&
                (this.CircleToCircleCollisionCheck(o), this.CircleToWallCollisionCheck(o));
            }
            for (let s = 0; s < this.physicPool.length; s++) this.physicPool[s].onPhysicUpdate();
          }
          for (let i = 0; i < this.physicPool.length; i++)
            this.physicPool[i].velocity.MultiplyScalar(this.simpleDrag);
        }
        CircleToCircleCollisionCheck(t) {
          if (t.collider instanceof w) {
            const i = this.physicPool.filter((s) => s.collider instanceof w && s !== t);
            for (let s = 0; s < i.length; s++) {
              const o = i[s];
              if (
                o.collider.collidable &&
                t.collider.radius + o.collider.radius >= r.Distance(t.position, o.position)
              ) {
                const p = t.position.Clone().Subtract(o.position),
                  u = p.Magnitude(),
                  M = t.collider.radius + o.collider.radius - u + 2 * 1e-6,
                  a = p
                    .Normalize()
                    .Clone()
                    .MultiplyScalar(M / 2);
                t.position.Add(a), o.position.Subtract(a);
                const c = t.velocity,
                  d = o.velocity,
                  h = t.mass,
                  e = o.mass,
                  l = t.position.Clone().Subtract(o.position).Normalize(),
                  C = c.Clone().Subtract(d).Dot(l);
                if (C > 0) return;
                const U = (-(1 + t.bounceFactor) * C) / (1 / h + 1 / e),
                  E = l.Clone().MultiplyScalar(U);
                t.velocity.Add(E.Clone().MultiplyScalar(1 / h)),
                  o.velocity.Subtract(E.Clone().MultiplyScalar(1 / e));
              }
            }
          }
        }
        CircleToWallCollisionCheck(t) {
          if (!(t.collider instanceof w)) return;
          const i = t.collider.radius,
            s = t.bounceFactor,
            o = 1e-6,
            y = (c, d) => {
              t.position.Add(c.Clone().MultiplyScalar(d + o));
              const h = t.velocity.Dot(c);
              if (h >= 0) return;
              const e = -(1 + s) * h;
              t.velocity.Add(c.Clone().MultiplyScalar(e));
            },
            p = i - t.position.y;
          p > 0 && y(new r(0, 1), p);
          const u = t.position.y + i - this.domain.y;
          u > 0 && y(new r(0, -1), u);
          const M = i - t.position.x;
          M > 0 && y(new r(1, 0), M);
          const a = t.position.x + i - this.domain.x;
          a > 0 && y(new r(-1, 0), a);
        }
      }
      class b {
        constructor(t) {
          this.color = t;
        }
      }
      class m extends b {
        constructor(t, i, s) {
          super(t), (this.color = t), (this.width = i), (this.height = s);
        }
      }
      class f extends b {
        constructor(t, i) {
          super(t), (this.color = t), (this.radius = i);
        }
      }
      class g extends b {
        constructor(t, i, s) {
          super(t), (this.color = t), (this.radiusX = i), (this.radiusY = s);
        }
      }
      class D {
        constructor(t) {
          (this.renderPool = []),
            (this.window = t),
            (this.cvs = this.CreateCanvas()),
            (this.ctx = this.cvs.getContext('2d')),
            document.body.appendChild(this.cvs),
            this.window.addEventListener('resize', () => {
              let i = document.createElement('canvas'),
                s = i.getContext('2d');
              (i.width = this.cvs.width),
                (i.height = this.cvs.height),
                s.drawImage(this.cvs, 0, 0),
                (this.cvs.width = t.innerWidth),
                (this.cvs.height = t.innerHeight),
                this.ctx.drawImage(i, 0, 0),
                i.remove();
            });
        }
        CreateCanvas() {
          let t = document.createElement('canvas');
          return (
            (t.id = 'cursorTrail'),
            t.style.setProperty('position', 'fixed'),
            t.style.setProperty('left', '0'),
            t.style.setProperty('top', '0'),
            t.style.setProperty('width', '100%'),
            t.style.setProperty('height', '100%'),
            t.style.setProperty('z-index', '10'),
            t.style.setProperty('pointer-events', 'none'),
            (t.width = window.innerWidth),
            (t.height = window.innerHeight),
            t
          );
        }
        PushRenderBody(t) {
          this.renderPool.push(t), this.SortRenderSequence();
        }
        PopRenderBody(t) {
          this.renderPool = this.renderPool.filter((i) => i !== t);
        }
        SortRenderSequence() {
          this.renderPool.sort((t, i) => t.renderPriority - i.renderPriority);
        }
        Render() {
          this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
          for (let t = 0; t < this.renderPool.length; t++) {
            const i = this.renderPool[t];
            if (
              (i.mesh instanceof f &&
                ((this.ctx.fillStyle = i.mesh.color),
                this.ctx.beginPath(),
                this.ctx.arc(i.position.x, i.position.y, i.mesh.radius, 0, 2 * Math.PI),
                this.ctx.closePath(),
                this.ctx.fill()),
              i.mesh instanceof g &&
                ((this.ctx.fillStyle = i.mesh.color),
                this.ctx.beginPath(),
                this.ctx.ellipse(
                  i.position.x,
                  i.position.y,
                  i.mesh.radiusX,
                  i.mesh.radiusY,
                  i.rotation.angle,
                  0,
                  2 * Math.PI
                ),
                this.ctx.closePath(),
                this.ctx.fill()),
              i.mesh instanceof m)
            ) {
              (this.ctx.fillStyle = i.mesh.color),
                this.ctx.save(),
                this.ctx.translate(i.position.x, i.position.y),
                this.ctx.rotate(i.rotation.angle);
              const s = i.mesh.width,
                o = i.mesh.height;
              (this.ctx.fillStyle = i.mesh.color),
                this.ctx.beginPath(),
                this.ctx.rect(-s / 2, -o / 2, s, o),
                this.ctx.closePath(),
                this.ctx.fill(),
                this.ctx.restore();
            }
            i.onRender(this.ctx);
          }
        }
      }
      class T {
        constructor() {
          (this.FRAME_PER_SECOND = 60),
            (this.SECOND_PER_FRAME = 1 / this.FRAME_PER_SECOND),
            (this.MS_PER_FRAME = this.SECOND_PER_FRAME * 1e3),
            (this.METER_TO_PIXEL = 50),
            (this.objectPool = []),
            (this.onStart = () => {}),
            (this.onKeyDown = () => {}),
            (this.onMouseMove = () => {}),
            (this.onMouseDown = () => {}),
            (this.onMouseUp = () => {}),
            (this.render = new D(window)),
            (this.physic = new A(
              new r(this.render.cvs.width, this.render.cvs.height),
              this.SECOND_PER_FRAME,
              this.METER_TO_PIXEL
            )),
            window.addEventListener('keydown', (t) => {
              this.onKeyDown(t);
            }),
            window.addEventListener('mousemove', (t) => {
              this.onMouseMove(t);
            }),
            window.addEventListener('mousedown', (t) => {
              this.onMouseDown(t);
            }),
            window.addEventListener('mouseup', (t) => {
              this.onMouseUp(t);
            });
        }
        start() {
          this.onStart(),
            setInterval(() => {
              this.physic.UpdatePhysics(), this.render.Render();
              for (let t = 0; t < this.objectPool.length; t++) this.objectPool[t].onFrameUpdate();
            }, this.MS_PER_FRAME);
        }
        createNewBall(t, i) {
          const s = new S(new r(0, 0), new w(t), new f(i, t));
          return this.create(s), s;
        }
        createNewEllipse(t, i, s) {
          const o = new S(new r(0, 0), new w(Math.max(t, i)), new g(s, t, i));
          return this.create(o), o;
        }
        createNewBox(t, i, s) {
          const o = new S(new r(0, 0), new w(Math.max(t, i) / 2), new m(s, t, i));
          return this.create(o), o;
        }
        create(t) {
          this.objectPool.push(t),
            this.physic.PushRigidBody(t.rigidbody),
            this.render.PushRenderBody(t.renderbody);
        }
        remove(t) {
          (this.objectPool = this.objectPool.filter((i) => i.uuid !== t.uuid)),
            this.physic.PopRigidBody(t.rigidbody),
            this.render.PopRenderBody(t.renderbody);
        }
      }
      function I() {
        const n = new T();
        let t = new r(0, 0);
        (n.onMouseMove = (i) => {
          (t.x = i.x), (t.y = i.y);
        }),
          (n.physic.simpleDrag = 1),
          (n.physic.gravity = !1),
          n.start(),
          N(n, t);
      }
      function N(n, t) {
        const i = (2 * Math.random() - 1) * 0.02;
        function s(e) {
          return e >= 0 && e < 2 ? e - 2 : 0;
        }
        const o = n.createNewEllipse(30, 30, '#FFAE19');
        (o.position.x = window.innerWidth / 2 + (2 * Math.random() - 1) * 100),
          (o.position.y = window.innerHeight / 2 + (2 * Math.random() - 1) * 100),
          (o.rigidbody.velocity.x = (2 * Math.random() - 1) * 2),
          (o.rigidbody.velocity.y = (2 * Math.random() - 1) * 2),
          (o.onFrameUpdate = () => {
            (o.rotation.angle += i),
              o.rigidbody.velocity.Magnitude() > 5 && o.rigidbody.velocity.MultiplyScalar(0.9),
              o.rigidbody.AddForce(
                n.physic.deltaTime * n.physic.meterToPixel * n.physic.simulationSpeed,
                t
                  .Clone()
                  .Subtract(o.position)
                  .Normalize()
                  .MultiplyScalar(s(r.Distance(o.position, t) / 100))
              );
          });
        const y = n.createNewBall(10, 'white');
        (y.rigidbody.collider.collidable = !1),
          (y.rigidbody.onPhysicUpdate = () => {
            const e = o.rotation.Vector().MultiplyScalar(10),
              l = o.rotation
                .Clone()
                .Rotate(Math.PI / 2)
                .Vector()
                .MultiplyScalar(-10);
            (y.position.x = o.position.x + e.x + l.x), (y.position.y = o.position.y + e.y + l.y);
          }),
          (y.renderbody.onRender = (e) => {
            (e.fillStyle = 'black'),
              e.beginPath(),
              e.arc(y.position.x, y.position.y, 5, 0, Math.PI * 2),
              e.fill();
          });
        const p = n.createNewBall(10, 'white');
        (p.rigidbody.collider.collidable = !1),
          (p.rigidbody.onPhysicUpdate = () => {
            const e = o.rotation.Vector().MultiplyScalar(10),
              l = o.rotation
                .Clone()
                .Rotate(Math.PI / 2)
                .Vector()
                .MultiplyScalar(10);
            (p.position.x = o.position.x + e.x + l.x), (p.position.y = o.position.y + e.y + l.y);
          }),
          (p.renderbody.onRender = (e) => {
            (e.fillStyle = 'black'),
              e.beginPath(),
              e.arc(p.position.x, p.position.y, 5, 0, Math.PI * 2),
              e.fill();
          });
        const u = n.createNewEllipse(5, 10, 'red');
        (u.rigidbody.collider.collidable = !1),
          (u.rigidbody.onPhysicUpdate = () => {
            u.rotation.angle = o.rotation.angle;
            const e = o.rotation.Vector().MultiplyScalar(-10),
              l = o.rotation
                .Clone()
                .Rotate(Math.PI / 2)
                .Vector()
                .MultiplyScalar(0);
            (u.position.x = o.position.x + e.x + l.x),
              (u.position.y = o.position.y + e.y + l.y),
              (u.renderbody.mesh.radiusX = 5 + o.rigidbody.velocity.Magnitude() / 2),
              (u.renderbody.mesh.radiusY = 10 + o.rigidbody.velocity.Magnitude() / 2);
          });
        const M = n.createNewEllipse(5, 12, '#4BCE5D');
        (M.rigidbody.collider.collidable = !1),
          (M.rigidbody.onPhysicUpdate = () => {
            M.rotation.angle = o.rotation.angle + 0.5;
            const e = o.rotation.Vector().MultiplyScalar(30),
              l = o.rotation
                .Clone()
                .Rotate(Math.PI / 2)
                .Vector()
                .MultiplyScalar(0);
            (M.position.x = o.position.x + e.x + l.x), (M.position.y = o.position.y + e.y + l.y);
          });
        const a = n.createNewBall(5, '#FFAE19');
        (a.renderbody.renderPriority = -1),
          (a.rigidbody.collider.collidable = !1),
          (a.position.x = o.position.x),
          (a.position.y = o.position.y),
          (a.rigidbody.onPhysicUpdate = () => {
            const e = o.rotation.Vector().MultiplyScalar(10),
              l = o.rotation
                .Clone()
                .Rotate(Math.PI / 2)
                .Vector()
                .MultiplyScalar(-37.5),
              P = new r(
                o.position.x + e.x + l.x + Math.random() * 8,
                o.position.y + e.y + l.y + Math.random() * 8
              );
            a.rigidbody.velocity.MultiplyScalar(0.95),
              P.Subtract(a.position).MultiplyScalar(0.1),
              a.rigidbody.AddForce(
                n.physic.deltaTime * n.physic.meterToPixel * n.physic.simulationSpeed,
                P
              );
          }),
          (a.renderbody.onRender = (e) => {
            (e.strokeStyle = '#FFAE19'),
              (e.lineWidth = 8),
              e.beginPath(),
              e.moveTo(a.position.x, a.position.y),
              e.lineTo(o.position.x, o.position.y),
              e.stroke();
          });
        const c = n.createNewBall(5, '#FFAE19');
        (c.renderbody.renderPriority = -1),
          (c.rigidbody.collider.collidable = !1),
          (c.position.x = o.position.x),
          (c.position.y = o.position.y),
          (c.rigidbody.onPhysicUpdate = () => {
            const e = o.rotation.Vector().MultiplyScalar(10),
              l = o.rotation
                .Clone()
                .Rotate(Math.PI / 2)
                .Vector()
                .MultiplyScalar(37.5),
              P = new r(
                o.position.x + e.x + l.x + Math.random() * 8,
                o.position.y + e.y + l.y + Math.random() * 8
              );
            c.rigidbody.velocity.MultiplyScalar(0.95),
              P.Subtract(c.position).MultiplyScalar(0.1),
              c.rigidbody.AddForce(
                n.physic.deltaTime * n.physic.meterToPixel * n.physic.simulationSpeed,
                P
              );
          }),
          (c.renderbody.onRender = (e) => {
            (e.strokeStyle = '#FFAE19'),
              (e.lineWidth = 8),
              e.beginPath(),
              e.moveTo(c.position.x, c.position.y),
              e.lineTo(o.position.x, o.position.y),
              e.stroke();
          });
        const d = n.createNewBall(5, '#FFAE19');
        (d.rigidbody.collider.collidable = !1),
          (d.renderbody.renderPriority = -1),
          (d.position.x = o.position.x),
          (d.position.y = o.position.y),
          (d.rigidbody.onPhysicUpdate = () => {
            const e = o.rotation.Vector().MultiplyScalar(-40),
              l = o.rotation
                .Clone()
                .Rotate(Math.PI / 2)
                .Vector()
                .MultiplyScalar(-10),
              P = new r(
                o.position.x + e.x + l.x + Math.random() * 8,
                o.position.y + e.y + l.y + Math.random() * 8
              );
            d.rigidbody.velocity.MultiplyScalar(0.95),
              P.Subtract(d.position).MultiplyScalar(0.1),
              d.rigidbody.AddForce(
                n.physic.deltaTime * n.physic.meterToPixel * n.physic.simulationSpeed,
                P
              );
          }),
          (d.renderbody.onRender = (e) => {
            (e.strokeStyle = '#FFAE19'),
              (e.lineWidth = 8),
              e.beginPath(),
              e.moveTo(d.position.x, d.position.y),
              e.lineTo(o.position.x, o.position.y),
              e.stroke();
          });
        const h = n.createNewBall(5, '#FFAE19');
        (h.rigidbody.collider.collidable = !1),
          (h.renderbody.renderPriority = -1),
          (h.position.x = o.position.x),
          (h.position.y = o.position.y),
          (h.rigidbody.onPhysicUpdate = () => {
            const e = o.rotation.Vector().MultiplyScalar(-40),
              l = o.rotation
                .Clone()
                .Rotate(Math.PI / 2)
                .Vector()
                .MultiplyScalar(10),
              P = new r(
                o.position.x + e.x + l.x + Math.random() * 8,
                o.position.y + e.y + l.y + Math.random() * 8
              );
            h.rigidbody.velocity.MultiplyScalar(0.95),
              P.Subtract(h.position).MultiplyScalar(0.1),
              h.rigidbody.AddForce(
                n.physic.deltaTime * n.physic.meterToPixel * n.physic.simulationSpeed,
                P
              );
          }),
          (h.renderbody.onRender = (e) => {
            (e.strokeStyle = '#FFAE19'),
              (e.lineWidth = 8),
              e.beginPath(),
              e.moveTo(h.position.x, h.position.y),
              e.lineTo(o.position.x, o.position.y),
              e.stroke();
          }),
          n.render.SortRenderSequence();
      }
      (function () {
        I();
      })();
    })();

    // cleanup
    return () => {
      const canvas = document.getElementById('cursorTrail');
      if (canvas) {
        canvas.remove();
      }
      window.onkeydown = null;
      window.onmousemove = null;
      window.onmousedown = null;
      window.onmouseup = null;
    };
  }, []);
};
